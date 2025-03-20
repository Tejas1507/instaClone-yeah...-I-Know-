import { auth, fireStore } from "../firebase/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { collection, query, where, getDocs } from "firebase/firestore";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);

  const showToast = useShowToast();
  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.fullname ||
      !inputs.username
    ) {
      console.log("Please fill all the fields");
      showToast("Error", "Please fill all the fields.", "error");
      return;
    }

    const userRef = collection(fireStore, "users");
    const q = query(userRef, where("userName", "==", inputs.username));
    const querySnapShot = await getDocs(q);

    if (!querySnapShot.empty){
      console.log("exists")
      showToast("Error", "Username already exists", "error");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        console.log("user exists ");
        showToast("Error", error.message, "error");
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          userName: inputs.username,
          fullName: inputs.fullname,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error, "error");
      return;
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
