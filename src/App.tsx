import { Box } from "@chakra-ui/react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <Box
      display="flex"
      className="App"
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <Main />
      <Footer />
    </Box>
  );
}

export default App;
