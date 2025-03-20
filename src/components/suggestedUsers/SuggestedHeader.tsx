import useAuthStore from "../../store/authStore";
import useLogOut from "../../hooks/useLogOut";
import { Flex, Avatar, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogOut();
  const authUser = useAuthStore((state) => state.user);
  if (!authUser) {
    return null;
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.userName}`}>
          <Avatar.Root size={"sm"}>
            <Avatar.Fallback name={"profile picture"} />
            <Avatar.Image src={authUser?.profilePicURL} />
          </Avatar.Root>
        </Link>
        <Link to={`${authUser.userName}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser?.userName}
            {/* {console.log(authUser.email)}; */}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        isLoading={isLoggingOut}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
