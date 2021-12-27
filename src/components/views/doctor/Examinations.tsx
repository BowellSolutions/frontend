import {FC, useEffect} from "react";
import CardBody from "../../card/CardBody";
import {Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {useAppSelector} from "../../../redux/hooks";
import {useDispatch} from "react-redux";
import {loadExaminations} from "../../../redux/actions/dashboard";
import ExaminationsTableRow from "../../tables/ExaminationsTableRow";
import ExaminationModal from "../../dashboard/ExaminationModal";

const Examinations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    // try to get examinations on first load
    dispatch(loadExaminations());
  }, []);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px" flexDirection={{base: "column", md: "row"}}>
          <Flex alignItems="center" width="80%" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Examinations
            </Text>
          </Flex>

          <Flex pt={{base: "4px", md: 0}}>
            <ExaminationModal/>
          </Flex>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={{sm: 1, md: 2, lg: 2, xl: 3}} spacing="8px">
            {examinations.length > 0 && examinations.map((examination) => {
              return (
                // fix this layout
                <ExaminationsTableRow
                  examination={examination}
                  key={`examination-row-${examination.id}`}
                />
              );
            })}
          </SimpleGrid>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Examinations;
