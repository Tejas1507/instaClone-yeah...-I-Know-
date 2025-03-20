import { Box, VStack, Image, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState();

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5} w={265}>
        <VStack spacing={4}>
          <Image
            src={"../../public/images/logo.png"}
            alt={"instagram logo"}
            cursor={"pointer"}
            h={24}
          />

          {isLogin ? <Login /> : <Signup />}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1}>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5} w={265}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
            fontSize={15}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
