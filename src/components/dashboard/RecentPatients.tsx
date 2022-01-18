/**
 * @author: Adam Lisichin
 * @file: Exports RecentPatients component - recently added patients in doctor's dashboard
 **/
import {useAppSelector} from "../../redux/hooks";
import {Avatar, Box, Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import {formatDate, getDaysBetweenDates} from "../views/utils/format";
import NextLink from "next/link";
import {UserData} from "../../api/types";

const DAYS_RECENT = 14;

const condition = (p: UserData) => {
  return p.type === "PATIENT" && getDaysBetweenDates(new Date(), new Date(p.date_joined)) < DAYS_RECENT;
}

const RecentPatients = () => {
  const patients = useAppSelector(state => state.dashboard.patients);

  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <SimpleGrid columns={{sm: 1, md: 2, lg: 1, xl: 2}} spacing={{sm: "8px", md: "12px", lg: "16px"}}>
      {patients.length > 0 && patients.filter(condition).map((patient) => (
        <Box
          px="16px" py="12px"
          bg={bgColor} borderRadius="12px" w="100%"
          key={`recent-patient-${patient.id}`}
          cursor="default"
          _hover={{shadow: 'md', transition: "box-shadow 0.3s"}}
        >
          <Flex justify="space-between" w="100%">
            <Flex direction="column" maxWidth={{md: "80%", xl: "85%"}}>
              <NextLink href={`/dashboard/patients/${encodeURIComponent(patient.id)}`}>
                <Text
                  color={nameColor} fontSize="md" fontWeight="bold" mb="10px" userSelect="none"
                  _hover={{textDecoration: "underline", cursor: "pointer"}}
                >
                  {patient.first_name} {patient.last_name}
                </Text>
              </NextLink>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Email:{" "}
                <Text as="span" color="gray.500">{patient.email}</Text>
              </Text>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Status:{" "}
                <Text as="span" color="gray.500">{patient.is_active ? "Active" : "Inactive"}</Text>
              </Text>

              <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                Joined:{" "}
                <Text as="span" color="gray.500">{formatDate(patient.date_joined)}</Text>
              </Text>
            </Flex>

            <Flex
              direction={{sm: "column", md: "row"}}
              align="center"
              p={{md: "24px", lg: "12px"}}
            >
              <NextLink href={`/dashboard/patients/${encodeURIComponent(patient.id)}`} passHref>
                <Avatar src="" alt="" h="32px" w="32px" cursor="pointer"/>
              </NextLink>
            </Flex>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RecentPatients;
