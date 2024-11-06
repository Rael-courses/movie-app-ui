import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from "react-i18next";
import { i18nMap } from "../../i18n/map";
import { useSearchMoviesQuery } from "../../queries/useSearchMoviesQuery";
import { useState } from "react";
import MoviesTable from "../../components/MoviesTable";

export default function Movies() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [searchTerm, setSearchTerm] = useState("");

  const { searchMoviesQueryResult } = useSearchMoviesQuery(
    searchTerm,
    currentLang
  );

  const movies = searchMoviesQueryResult.data?.results ?? [];

  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Box>
      <SearchBar
        placeholder={t(i18nMap.movies.searchBar.placeholder)}
        onSearch={onSearch}
      />

      <MoviesTable movies={movies} />
    </Box>
  );
}
