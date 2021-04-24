import { Container, Flex } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex display="flex" h={14} as="header" marginBottom="auto" shadow="base">
      <Container
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={24}
        fontFamily="heading"
      >
        Генерация документов
      </Container>
    </Flex>
  );
};
