import { Flex, Box, Text } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark, BsSuitHeart } from "react-icons/bs";

const ProfileTabs = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      w={"full"}
      justifyContent={"center"}
      fontWeight={"bold"}
      textTransform={"uppercase"}
    >
      <Flex
        p={3}
        gap={1}
        alignItems={"center"}
        borderTop={"1px solid white"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Posts
        </Text>
      </Flex>
      <Flex
        p={3}
        gap={1}
        alignItems={"center"}
        // borderTop={"1px solid white"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Saved
        </Text>
      </Flex>
      <Flex
        p={3}
        gap={1}
        alignItems={"center"}
        // borderTop={"1px solid white"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsSuitHeart fontWeight={"bold"} />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Likes
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileTabs;
