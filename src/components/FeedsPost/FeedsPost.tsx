import { Box, Container, Flex, Skeleton, VStack } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { useState, useEffect } from "react";
import { SkeletonCircle } from "../ui/skeleton";

const FeedsPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [1, 2, 3, 4].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"felx-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"150px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>Content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          <FeedPost
            username={"adam_gay"}
            avatar={"../../public/images/img10.jpg"}
            img={"../../public/images/alien.jpg"}
          />
          <FeedPost
            username={"rosh_michele"}
            avatar={"../../public/images/img13.jpg"}
            img={"../../public/images/img35.jpg"}
          />
          <FeedPost
            username={"emy_grahm"}
            avatar={"../../public/images/img45.jpg"}
            img={"../../public/images/img43.jpg"}
          />
          <FeedPost
            username={"wise_lord"}
            avatar={"../../public/images/img37.jpg"}
            img={"../../public/images/img22.jpg"}
          />
        </>
      )}
    </Container>
  );
};

export default FeedsPost;
