import Auth from "../../components/authForm/auth";
import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";

export const Login = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container centerContent padding={0} maxW={"container.md"}>
        <Flex
          minH={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          px={4}
        >
          {/* Left hand side for large screens */}
          <Box display={{ base: "none", md: "block" }}>
            <Image
              src={"../../public/images/auth.png"}
              alt={"authImage"}
              h={550}
            />
          </Box>
          {/* Right hand side for mobile devices */}
          <VStack   w={265}>
            <Auth />
            <Box textAlign={"center"}>Get the App.</Box>
            <Flex gap={5} align={"stretch"}>
              <Image
                src={"../../public/images/microsoft.png"}
                alt={"microsoft icon"}
                h={10}
              />
              <Image
                src={"../../public/images/playstore.png"}
                alt={"playstore icon"}
                h={10}
              />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Login;
