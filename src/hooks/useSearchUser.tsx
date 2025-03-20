import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    try {
      const q = query(
        collection(fireStore, "users"),
        where("userName", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        showToast("Error", "User not Found", "error");
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      setIsLoading(true);
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, user, getUserProfile, setUser };
};

export default useSearchUser;
