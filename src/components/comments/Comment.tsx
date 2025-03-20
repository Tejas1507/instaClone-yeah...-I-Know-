import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = ({ createdAt, userName, profilePic, text }) => {
  return (
    <Flex gap={4}>
      <Avatar.Root size={"sm"}>
        <Avatar.Fallback name="post image" />
        <Avatar.Image src={profilePic} />
      </Avatar.Root>
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}>
            {userName}
          </Text>
          <Text fontSize={14}>{text}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
