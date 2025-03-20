import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Flex, Avatar, Box, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

const SuggestedUser = ({ user, setUser }) => {
  console.log(user?.uid);
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    user?.uid
  );
  const authUser = useAuthStore((state) => state.user);
  const onFollowerUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar.Root size={"md"}>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={user?.profilePicURL} />
        </Avatar.Root>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user?.fullName}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {user?.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {/* { authUser.uid !== user.uid && ()} */}
      <Button
        fontSize={13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{ color: "white" }}
        isLoading={isUpdating}
        onClick={onFollowerUser}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
