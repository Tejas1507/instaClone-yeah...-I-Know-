import {
  GridItem,
  Flex,
  Text,
  Image,
  Box,
  Avatar,
  VStack,
  Separator,
  Stack,
  Button,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  DialogBody,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogCloseTrigger,
} from "../ui/dialog";
import { MdDelete } from "react-icons/md";
import Comment from "../comments/Comment";
import PostFooter from "../FeedsPost/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject } from "firebase/storage";
import {
  Firestore,
  arrayRemove,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import usePostStore from "../../store/postStore";

const ProfilePost = ({ post }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostCount = useUserProfileStore(
    (state) => state.deletePost
  );

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(fireStore, "users", authUser.uid);
      await deleteDoc(doc(fireStore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      deletePost(post.id);
      decrementPostCount(post.id);
      showToast("Success", "Post deleted successfully!", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  const showToast = useShowToast();
  return (
    <>
      <DialogRoot placement={"center"} size={{ base: "cover", md: "cover" }}>
        <DialogTrigger>
          <GridItem
            cursor={"pointer"}
            borderRadius={4}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"whiteAlpha.300"}
            position={"relative"}
            aspectRatio={1 / 1}
          >
            <Flex
              opacity={0}
              _hover={{ opacity: 1 }}
              position={"absolute"}
              top={0}
              bottom={0}
              left={0}
              right={0}
              bg={"blackAlpha.700"}
              transition={"all 0.3s ease"}
              zIndex={1}
              justifyContent={"center"}
            >
              <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                <Flex>
                  <AiFillHeart size={20} />
                  <Text fontWeight={"bold"} ml={2}>
                    {post.likes.length}
                  </Text>
                </Flex>
                <Flex>
                  <FaComment size={20} />
                  <Text fontWeight={"bold"} ml={2}>
                    {post.comments.length}
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Image
              src={img}
              alt={"porfile post"}
              h={"100%"}
              w={"100%"}
              objectFit={"cover"}
            />
          </GridItem>
        </DialogTrigger>
        <DialogContent bg={"whiteAlpha.1"} h={"100%"} pb={5}>
          {/* <DialogHeader bg={"white"} color={"white"}></DialogHeader> */}
          <DialogBody>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              p={"10px"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid "}
                borderColor={"whiteAlpha.300"}
                flex={1.25}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={post.imageURL}
                  alt={"porfile post"}
                  h={"400px"}
                  w={"100%"}
                  aspectRatio={1 / 1}
                  // objectFit={"cover"}
                  fit={"contain"}
                />
              </Flex>

              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
                maxH={"420px"}
                overflowY={"auto"}
              >
                <Stack>
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"} gap={1}>
                      <Avatar.Root size={"sm"}>
                        <Avatar.Fallback name="profile picture" />
                        <Avatar.Image src={userProfile.profilePicURL} />
                      </Avatar.Root>
                      <Text fontSize={12} fontWeight={"bold"}>
                        {userProfile.userName}
                      </Text>
                    </Flex>
                    {authUser?.uid === userProfile.uid && (
                      <Button
                        size={"sm"}
                        bg={"transparent"}
                        _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                        borderRadius={4}
                        isLoading={isDeleting}
                        p={1}
                      >
                        <MdDelete size={20} cursor={"pointer"} />
                      </Button>
                    )}
                  </Flex>
                  <Separator mb={"8px"} />
                </Stack>

                <VStack
                  w={"full"}
                  maxH={"350px"}
                  // minH={"0px"}
                  overflowY={"auto"}
                  alignItems={"start"}
                  // justifyContent={"center"}
                >
                  <Comment
                    createdAt={"1d ago"}
                    userName={"brewing_dude"}
                    profilePic={"../../public/images/img25.jpg"}
                    text={"what to say, hey?"}
                  />
                  <Comment
                    createdAt={"12h ago"}
                    userName={"lightning_beam"}
                    profilePic={"../../public/images/img17.jpg"}
                    text={"faster!!! not enough."}
                  />
                  <Comment
                    createdAt={"1min ago"}
                    userName={"soonAT"}
                    profilePic={"../../public/images/img42.jpg"}
                    text={"BE-lateted..."}
                  />
                  <Comment
                    createdAt={"1d ago"}
                    userName={"brewing_dude"}
                    profilePic={"../../public/images/img25.jpg"}
                    text={"what to say, hey?"}
                  />
                  <Comment
                    createdAt={"12h ago"}
                    userName={"lightning_beam"}
                    profilePic={"../../public/images/img17.jpg"}
                    text={"faster!!! not enough."}
                  />
                  <Comment
                    createdAt={"1min ago"}
                    userName={"soonAT"}
                    profilePic={"../../public/images/img42.jpg"}
                    text={"BE-lateted..."}
                  />
                </VStack>

                <Separator spaceX={2} mt={2} />

                <PostFooter isProfilePage={true} />
                {/* <Box
                  w={"full"}
                  h={"full"}
                  bg={"white"}
                  border={"5px solid green"}
                  // p={"5px"}
                  // mt={"auto"}
                >
                  hje
                </Box> */}
              </Flex>
            </Flex>
          </DialogBody>
          <DialogCloseTrigger top="0" insetEnd="0" bg="bg" />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default ProfilePost;
