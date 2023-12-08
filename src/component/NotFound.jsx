import { Box, Container, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Container
      maxW="7xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="70vh"
    >
      <Box padding="10" border="1px solid gray" borderRadius="16px" shadow="xl">
        <Text
          fontSize="xxx-large"
          fontWeight="bold"
          textAlign="center"
          color={"#ff6d21"}
        >
          404 NOT FOUND
        </Text>
      </Box>
    </Container>
  );
};

export default NotFound;
