import { Box, Flex, Grid, Skeleton, VStack, Text } from "@chakra-ui/react";
import ProfilePost from "./profilePost";
import { useEffect, useState } from "react";
import useGetUserPost from "../../hooks/useGetUserPost";

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const { posts } = useGetUserPost();

  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostFound />;
  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      gap={6}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <VStack key={idx} alignItems={"felx-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
          {/* <ProfilePost img={"../../public/images/img26.jpg"} />
          <ProfilePost img={"../../public/images/img39.jpg"} />
          <ProfilePost img={"../../public/images/img41.jpg"} />
          <ProfilePost img={"../../public/images/img40.jpg"} /> */}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found!</Text>
    </Flex>
  );
};
