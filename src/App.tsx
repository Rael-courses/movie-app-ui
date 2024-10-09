import { StyledEngineProvider } from "@mui/material";
import Router from "./Router";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
