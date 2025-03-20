import { Box, Flex } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assests/constants";
import { Tooltip } from "../ui/tooltip";
const Notifications = () => {
	return (
		<Tooltip
				// hasArrow
				content={"Notifications"}
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
			>
				<NotificationsLogo />
				<Box display={{ base: "none", md: "block" }}>Notifications</Box>
			</Flex>
		</Tooltip>
	);
};

export default Notifications;