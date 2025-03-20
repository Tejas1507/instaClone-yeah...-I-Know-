import { auth } from "../firebase/firebase.tsx";
import Sidebar from "../components/sidebar/sidebar.tsx";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";

type PageLayoutProp = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProp> = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/login" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/login";
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;
  
  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* sidebar on the right */}
      {canRenderNavbar ? <Navbar /> : null}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70 px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};
