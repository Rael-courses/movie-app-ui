import { createContext, PropsWithChildren, useContext, useState } from "react";

type SearchTermContextType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const SearchTermContext = createContext<SearchTermContextType | null>(null);

export function SearchTermContextProvider({ children }: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchTermContext.Provider>
  );
}

export function useSearchTermContext(): SearchTermContextType {
  const context = useContext(SearchTermContext);

  if (context === null) {
    throw new Error(
      "useSearchTerm must be used within a SearchTermContextProvider"
    );
  }

  return context;
}
