import useAuthStore from "../../store/authStore";
import { fireStore, auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Text, Image } from "@chakra-ui/react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);
  const showToast = useShowToast();
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(fireStore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          userName: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
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
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={handleGoogleAuth}
      >
        <Image src="../../public/images/google.png" alt="Google logo" w={5} />
        <Text mx={2} color={"blue.500"}>
          {prefix} In with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
