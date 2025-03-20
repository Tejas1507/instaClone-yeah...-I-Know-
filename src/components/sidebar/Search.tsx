import { Box, Button, Dialog, Flex, Portal } from "@chakra-ui/react";
import { SearchLogo } from "../../assests/constants";
import { Tooltip } from "../ui/tooltip";
import * as Chakra from "@chakra-ui/react";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import SuggestedUser from "../suggestedUsers/SuggestedUser";

const Search = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  const dialogStatus = () => {
    setOpen(!open);
  };
  console.log(user);
  return (
    <>
      <Tooltip
        // hasArrow
        content={"Search"}
        // ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
        showArrow
        positioning={{ placement: "right" }}
        margin-left={1}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={dialogStatus}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      <Dialog.Root
        placement={"center"}
        motionPreset="slide-in-left"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg={"black"}
              border={"1px solid gray"}
              maxW={"400px"}
            >
              <Dialog.Header>
                <Dialog.Title>Search User</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb={6}>
                <form onSubmit={handleSearchUser}>
                  <Chakra.Fieldset.Root size="lg" maxW="md">
                    <Chakra.Fieldset.Content>
                      <Chakra.Field.Root>
                        <Chakra.Field.Label>Username</Chakra.Field.Label>
                        <Chakra.Input
                          name="name"
                          placeholder="Add a note"
                          ref={searchRef}
                        />
                      </Chakra.Field.Root>
                      <Button
                        type="submit"
                        alignSelf="flex-end"
                        size={"sm"}
                        isLoading={isLoading}
                        my={4}
                        ml={"auto"}
                      >
                        {" "}
                        Search
                      </Button>
                    </Chakra.Fieldset.Content>
                  </Chakra.Fieldset.Root>
                </form>
                {user && <SuggestedUser user={user} setUser={setUser} />}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default Search;
