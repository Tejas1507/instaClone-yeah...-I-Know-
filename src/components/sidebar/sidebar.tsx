// import { Flex, Box } from '@chakra-uireact'
import {
  InstagramLogo,
  InstagramMobileLogo,
} from "../../assests/constants";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Tooltip } from "../ui/tooltip";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";
import SideBarItems from "./sidebarItems";

const Sidebar = () => {
  
  const { handleLogout, isLoggingOut, error } = useLogOut();
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
        <Link
          as={RouterLink}
          to={"/"}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        <Link
          as={RouterLink}
          to={"/"}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpah.200" }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SideBarItems/>
        </Flex>
      </Flex>
      <Flex>
        <Tooltip
          content={"Logout"}
          // key={index}
          showArrow
          positioning={{ placement: "right" }}
          margin-left={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            _hover={{ bg: "whiteAlpha.400" }}
            margin-top={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
              display={{ base: "none", md: "block" }}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
