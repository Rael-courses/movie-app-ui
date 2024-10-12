import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { i18nMap } from "../../i18n/map";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useCurrentLang from "../../i18n/hooks/useCurrentLang";
import { MovieDto } from "../../services/api/tmdb/dto";
import useSearchMoviesQuery from "../../queries/SearchMoviesQuery";

export default function Movies() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const currentLang = useCurrentLang();
  const { searchMoviesQueryResult: searchMoviesResponse } =
    useSearchMoviesQuery(searchTerm, currentLang);
  const movies = searchMoviesResponse.data?.results ?? ([] as MovieDto[]);

  return (
    <Box>
      <SearchBar
        placeholder={t(i18nMap.movies.searchBar.placeholder)}
        onSearch={setSearchTerm}
      />
      <Box>
        {movies.map((m) => (
          <Box key={m.id}>
            {m.title}: {m.overview}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
