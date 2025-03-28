import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return console.log("Please fill all the fields");
      //   showToast("Error", "Please fill all the fields", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      
      if (userCred) {
        const docRef = doc(fireStore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      console.log(error.message);
      showToast("Error", error.message, "error");
    }
  };
  return { loading, error, login };
};

export default useLogin;
