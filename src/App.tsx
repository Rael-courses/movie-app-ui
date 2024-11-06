import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import { StyledEngineProvider } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Router />
      </StyledEngineProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
