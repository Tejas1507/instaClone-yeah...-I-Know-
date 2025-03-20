import {
  Box,
  Dialog,
  Flex,
  Portal,
  Button,
  Image,
  Input,
  Textarea,
  CloseButton,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assests/constants";

import * as Chakra from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { create } from "zustand";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { fireStore, storage } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const dialogStatus = () => {
    setOpen(!open);
  };
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();
  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);

      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        // hasArrow
        content={"Create"}
        // ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
        showArrow
        positioning={{ placement: "right" }}
        margin-left={1}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={dialogStatus}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Dialog.Root
        placement={"center"}
        motionPreset="slide-in-left"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg={"black"}
              border={"1px solid gray"}
              maxW={"400px"}
            >
              <Dialog.Header>
                <Dialog.Title>Search User</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb={6}>
                {/* <form onSubmit={handleSearchUser}> */}
                <Chakra.Fieldset.Root size="lg" maxW="md">
                  <Chakra.Fieldset.Content>
                    {/* <Chakra.Field.Root>
                      <Chakra.Field.Label>Username</Chakra.Field.Label>
                      <Chakra.Input
                        name="name"
                        placeholder="Add a note"
                        //   ref={searchRef}
                      />
                    </Chakra.Field.Root> */}
                    <Textarea
                      placeholder="Post caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />

                    <Input
                      type="file"
                      hidden
                      ref={imageRef}
                      onChange={handleImageChange}
                    />

                    <BsFillImageFill
                      onClick={() => imageRef.current.click()}
                      style={{
                        marginTop: "15px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      size={16}
                    />
                    {selectedFile && (
                      <Flex
                        mt={5}
                        w={"full"}
                        position={"relative"}
                        justifyContent={"center"}
                      >
                        <Image src={selectedFile} alt="Selected img" />
                        <CloseButton
                          position={"absolute"}
                          top={2}
                          right={2}
                          onClick={() => {
                            setSelectedFile(null);
                          }}
                        />
                      </Flex>
                    )}
                    <Button
                      type="submit"
                      //   alignSelf="flex-end"
                      size={"sm"}
                      // isLoading={isLoading}
                      my={4}
                      ml={"auto"}
                      onClick={handlePostCreation}
                    >
                      {" "}
                      Post
                    </Button>
                  </Chakra.Fieldset.Content>
                </Chakra.Fieldset.Root>
                {/* </form> */}
                {/* {user && <SuggestedUser user={user} setUser={setUser} />} */}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.post);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const addPost = useUserProfileStore((state) => state.addPost);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile: string, caption: any) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(fireStore, "posts"), newPost);
      const userDocRef = doc(fireStore, "users", authUser.uid);

      const imageRef = ref(storage, `posts/${postDocRef.id}`);
	  console.log(postDocRef);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;
      

      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
