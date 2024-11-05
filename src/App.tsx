import Router from "./Router";
import { StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
