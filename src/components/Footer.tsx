import { Box, Container, Link } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box h={14} borderTop="1px solid" borderColor="purple.100" marginTop="auto">
      <Container
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontFamily="heading"
      >
        Copyright 2021{" "}
        <Link
          ml={1}
          textDecoration="underline"
          color="cyan.500"
          _hover={{ color: "cyan.600" }}
          target="_blank"
          href="//statsnet.co"
        >
          statsnet.co
        </Link>
      </Container>
    </Box>
  );
};
