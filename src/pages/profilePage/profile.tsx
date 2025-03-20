import ProfilePosts from "../../components/profile/profilePosts";
import ProfileTabs from "../../components/profile/profileTabs";
import ProfileHeader from "../../components/profile/profileHeader";
import {
  Container,
  Flex,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Link as RouterLink } from "react-router-dom";
import { SkeletonCircle } from "../../components/ui/skeleton";

export const Profile = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        px={10}
        py={4}
        pl={{ base: 4, md: 10 }}
        mx={"auto"}
        w={"full"}
        flexDirection={"column"}
      >
        {/* <ProfileHeader /> */}
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default Profile;

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>
        User Not Found
        <Link
          as={RouterLink}
          to={"/"}
          color={"blue.500"}
          w={"max-content"}
          mx={"auto"}
        >
          Go Home
        </Link>
      </Text>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size={24} />
      <VStack
        flex={1}
        mx={"auto"}
        gap={2}
        alignItems={{ base: "center", sm: "flex-start" }}
      >
        <Skeleton height={"12px"} width={"125px"} />
        <Skeleton height={"12px"} width={"150px"} />
       <Skeleton height={"12px"} width={"125px"} />
       <Skeleton height={"12px"} width={"150px"} />
      </VStack>
    </Flex>
  );
};
