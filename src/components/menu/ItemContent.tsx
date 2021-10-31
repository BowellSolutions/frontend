import {Icon} from "@chakra-ui/icon";
import {Avatar, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {AiFillClockCircle} from "react-icons/ai";
import {FC} from "react";

interface ItemContentProps {
  aName: string,
  aSrc: string,
  boldInfo: string,
  info: string,
  time: string,
}

const ItemContent: FC<ItemContentProps> = (
  {aName, aSrc, boldInfo, info, time}
) => {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Avatar name={aName} src={aSrc} borderRadius="12px" me="16px"/>
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {boldInfo}{" "}
          </Text>
          {info}
        </Text>
        <Flex alignItems="center">
          <Icon
            as={AiFillClockCircle}
            color={navbarIcon}
            w="13px"
            h="13px"
            me="3px"
          />
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {time}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default ItemContent;
