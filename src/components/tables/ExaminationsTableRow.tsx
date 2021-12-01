import {FC} from "react";
import {ExaminationData} from "../../api/types";
import {Badge, Box, Button, Collapse, Flex, Icon, IconButton, Text, useColorModeValue} from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/hooks";
import {FaPencilAlt} from "react-icons/fa";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {DeleteIcon} from "@chakra-ui/icons";
import FileUpload from "../dashboard/FileUpload";
import {updateExamination} from "../../api/examinations";
import {useDispatch} from "react-redux";
import {loadExaminations, loadRecordings} from "../../redux/actions/dashboard";
import { formatDate } from "components/views/utils/format";
import EditExaminationModal from "../dashboard/EditExaminationModal";

interface ExaminationsTableRowProps {
  examination: ExaminationData,
}

const ExaminationsTableRow: FC<ExaminationsTableRowProps> = ({examination}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  const {isOpen, onToggle} = useDisclosure();

  const dispatch = useDispatch();

  const handleDetachFile = () => {
    if (examination.recording != null) {
      updateExamination(examination.id, {recording: null}).then((res) => {
        dispatch(loadExaminations());
        dispatch(loadRecordings());
      });
    }
  };

  return (
    <Flex
      px="24px" py="12px" bg={bgColor} my="8px" mx="8px"
      borderRadius="12px" w="100%"  direction="column"
    >
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {examination?.patient?.first_name} {examination?.patient?.last_name}
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Examination ID:{" "}
            <Text as="span" color="gray.500">{examination.id}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Email:{" "}
            <Text as="span" color="gray.500">{examination?.patient?.email}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Appointment Date:{" "}
            <Text as="span" color="gray.500">{formatDate(examination.date)}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Status:{" "}
            <Text as="span" color="gray.500">{examination.status}</Text>
          </Text>

          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Recording:{" "}

            {examination.recording != null ? (
              <Text as="span" color="green.500">{examination.recording.name}</Text>
            ) : (
              <Text as="span" color="red.500">None</Text>
            )}

          </Text>
        </Flex>

        <Flex
          direction={{sm: "column", md: "row"}}
          align="center"
          p={{md: "24px"}}
        >
          <EditExaminationModal examinationId={examination.id}/>
        </Flex>
      </Flex>

      <Flex direction="row" w="100%">
        <Box>
          <Icon
            as={isOpen ? MdExpandLess : MdExpandMore}
            h="24px"
            w="24px"
            ml="-6px"
            onClick={onToggle}
          />
        </Box>

        <Collapse in={isOpen} animateOpacity>
          <Flex
            p="24px"
            mt="4"
            rounded="md"
            shadow="md"
            w="100%"
          >
            {examination.recording != null ? (
              <Flex
                flexDirection="row"
                alignItems="center"
              >
                <Text as="p">
                  {examination.recording.name}
                </Text>

                <IconButton
                  ml="8px"
                  h="32px"
                  w="32px"
                  colorScheme="red"
                  aria-label="Remove file"
                  icon={<DeleteIcon/>}
                  onClick={() => handleDetachFile()}
                />
              </Flex>
            ) : (
              <>
                <Text fontSize="lg" color={textColor}>
                  Attach File
                </Text>

                <FileUpload examinationId={examination.id}/>
              </>
            )}
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  );
};


export default ExaminationsTableRow;
