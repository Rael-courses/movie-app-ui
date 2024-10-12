import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { i18nMap } from "../../i18n/map";
import { useTranslation } from "react-i18next";
import useCurrentLang from "../../i18n/hooks/useCurrentLang";
import useSearchMoviesQuery from "../../queries/SearchMoviesQuery";
import MoviesTable from "../../components/MoviesTable";
import { MovieModel } from "../../models/MovieModel";
import { useSearchTermContext } from "../../contexts/SearchTermContext";

export default function Movies() {
  const { t } = useTranslation();
  const { searchTerm, setSearchTerm } = useSearchTermContext();
  const currentLang = useCurrentLang();
  const { searchMoviesQueryResult: searchMoviesResponse } =
    useSearchMoviesQuery(searchTerm, currentLang);
  const movies = searchMoviesResponse.data?.results ?? ([] as MovieModel[]);

  return (
    <Box>
      <SearchBar
        placeholder={t(i18nMap.movies.searchBar.placeholder)}
        defaultSearchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <MoviesTable movies={movies} />
    </Box>
  );
}
