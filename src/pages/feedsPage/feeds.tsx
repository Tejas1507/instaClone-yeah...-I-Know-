import SuggestedUsers from "../../components/suggestedUsers/SuggestedUsers";
import FeedsPost from "../../components/FeedsPost/FeedsPost";
import { Container, Flex, Box } from "@chakra-ui/react";

export const Feeds = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10} >
          <FeedsPost/> 
        </Box>
        <Box
          flex={3}
          mr={30}
          maxW={"300px"}
          display={{ base: "none", lg: "block" }}
        >
          <SuggestedUsers/>
        </Box>
      </Flex>
    </Container>
  );
};

export default Feeds;
