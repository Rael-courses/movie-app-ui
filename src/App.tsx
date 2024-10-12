import { StyledEngineProvider } from "@mui/material";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SearchTermContextProvider } from "./contexts/SearchTermContext";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <SearchTermContextProvider>
          <Router />
        </SearchTermContextProvider>
      </StyledEngineProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
