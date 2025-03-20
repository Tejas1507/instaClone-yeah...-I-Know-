// import { Avatar } from "@chakra-ui/avatar";
import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

const PostHeader = ({username, avatar}) => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"full"}
        my={2}
      >
        <Flex alignItems={"center"} gap={2}>
          <Avatar.Root size={"sm"}>
            <Avatar.Fallback name={"profile picture"} />
            <Avatar.Image src={avatar} />
          </Avatar.Root>
          <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            {username}
            <Box color={"gray.500"}> 1w</Box>
          </Flex>
        </Flex>
        <Box cursor={"pointer"}>
          <Text
            fontSize={12}
            color={"blue.500"}
            fontWeight={"bold"}
            _hover={{ color: "white" }}
            transition={"0.2 ease-in-out"}
          >
            Unfollow
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default PostHeader;
