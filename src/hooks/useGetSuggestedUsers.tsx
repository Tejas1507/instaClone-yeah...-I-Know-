import React, { useEffect, useState } from "react";
import SuggestedUser from "../components/suggestedUsers/SuggestedUser";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { useRef } from "react";
import { fireStore } from "../firebase/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    setIsLoading(true);
    const getSuggestedUsers = async () => {
      try {
        const userRef = collection(fireStore, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);
  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
