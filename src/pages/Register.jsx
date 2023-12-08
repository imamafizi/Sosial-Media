import { Box, Container } from "@chakra-ui/react";
import { CardRegister } from "../component/CardRegister";

export const Register = () => {
  return (
    <Container maxW="6xl" display={"flex"} justifyContent={"center"}>
      <Box mt={"70px"}>
        <CardRegister />
      </Box>
    </Container>
  );
};
