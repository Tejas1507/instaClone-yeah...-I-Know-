import {
  UnlikeLogo,
  NotificationsLogo,
  CommentLogo,
} from "../../assests/constants";
import { Flex, Box, Text, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { InputGroup } from "../ui/input-group";

const PostFooter = ({ username, isProfilePage }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <Box  mt={"auto"}>
      <Flex alignItems={"center"} gap={4} pt={4} mt={2} mb={4} w={"full"}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontSize={"sm"} fontWeight={600}>
        {likes} Likes
      </Text>

      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {username}{" "}
            <Text as={"span"} fontWeight={400}>
              chillNpill``
            </Text>
          </Text>

          <Text fontSize={"sm"} color={"gray"}>
            view all 1,000 comments
          </Text>
        </>
      )}

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
        w={"full"}
      >
        <InputGroup
          flex={"1"}
          endElement={
            <Button
              fontSize={14}
              fontWeight={600}
              color={"blue.500"}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
            >
              Post
            </Button>
          }
        >
          <Input
            placeholder={"Add a comment..."}
            variant={"flushed"}
            fontSize={14}
          />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
