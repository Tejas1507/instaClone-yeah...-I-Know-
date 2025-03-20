import { Avatar, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AvatarGroup } from "../ui/avatar";
import useAuthStore from "../../store/authStore";
import { Tooltip } from "../ui/tooltip";
const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Tooltip
      // hasArrow
      content={"Profile"}
      // ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
      showArrow
      positioning={{ placement: "right" }}
      // margin-left={1}
    >
      <Link
        // display={"flex"}
        to={`/${authUser?.userName}`}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <AvatarGroup
          justifySelf={"center"}
          alignSelf={"flex-start"}
          //   mx={"auto"}
          size={"sm"}
        >
          <Avatar.Root>
            <Avatar.Fallback name="profile picture" />
            <Avatar.Image src={authUser?.profilePicURL || ""} />
          </Avatar.Root>
        </AvatarGroup>
        {/* <Avatar size={"sm"} src={authUser?.profilePicURL || ""} /> */}
        <Box display={{ base: "none", md: "block" }}>Profile</Box>
      </Link>
    </Tooltip>
  );
};

export default ProfileLink;
