import { Box, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from "react-i18next";
import { i18nMap } from "../../i18n/map";
import { useSearchMoviesQuery } from "../../queries/useSearchMoviesQuery";
import { useState } from "react";

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

      <Box>
        {movies.map((m) => (
          <Typography key={m.id}>
            {m.title}, {m.getFormattedReleaseDate(currentLang)}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
