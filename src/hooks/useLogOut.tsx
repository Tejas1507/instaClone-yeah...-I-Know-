import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogOut = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logOut = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logOut();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { handleLogout, isLoggingOut, error };
};

export default useLogOut;
