import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { i18nMap } from "../../i18n/map";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useCurrentLang from "../../i18n/hooks/useCurrentLang";
import { TmdbApiService } from "../../services/api/tmdb";
import { container } from "tsyringe";
import { MovieDto } from "../../services/api/tmdb/dto";

const tmdbApiService = container.resolve(TmdbApiService);

export default function Movies() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<MovieDto[]>([]);

  const currentLang = useCurrentLang(async (lang: string) => {
    tmdbApiService
      .search(searchTerm, lang)
      .then((response) => setMovies(response.results));
  });

  const onSearch = async (term: string) => {
    setSearchTerm(term);
    tmdbApiService
      .search(term, currentLang)
      .then((response) => setMovies(response.results));
  };

  return (
    <Box>
      <SearchBar
        placeholder={t(i18nMap.movies.searchBar.placeholder)}
        onSearch={onSearch}
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
