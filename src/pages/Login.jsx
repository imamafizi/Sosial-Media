import { Box, Container } from "@chakra-ui/react";
import { CardLogin } from "../component/CardLogin";

export const Login = () => {
  return (
    <Container maxW="6xl" display={"flex"} justifyContent={"center"}>
      <Box mt={"70px"}>
        <CardLogin />
      </Box>
    </Container>
  );
};
