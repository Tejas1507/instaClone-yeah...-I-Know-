import { Flex, Avatar, VStack, Text, Button } from "@chakra-ui/react";
import { AvatarGroup } from "../ui/avatar";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuth =
    authUser && authUser.userName === userProfile.userName;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.userName !== userProfile.userName;

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        justifySelf={"center"}
        // alignSelf={"flex-start"}
        mx={"auto"}
        size={{ base: "2xl", md: "2xl" }}
      >
        <Avatar.Root>
          <Avatar.Fallback name="profile picture" />
          <Avatar.Image src={userProfile?.profilePicURL} />
        </Avatar.Root>
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          gap={4}
          direction={{ base: "column", md: "row" }}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile?.userName}
          </Text>
          {visitingOwnProfileAndAuth && (
            <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitingAnotherProfileAndAuth && (
            <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.400" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                loading={isUpdating}
              >
                {isFollowing ? "UnFollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>

        <Flex gap={{ base: 2, sm: 4 }} alignItems={"center"}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.following.length}
            </Text>
            Following
          </Text>
        </Flex>

        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile?.fullName}
          </Text>
        </Flex>

        <Text fontSize={"sm"}>{userProfile?.bio} </Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
