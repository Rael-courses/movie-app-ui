import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from "react-i18next";
import { i18nMap } from "../../i18n/map";
import { container } from "tsyringe";
import { TmdbApiService } from "../../services/api/tmdb";

const tmdbApiService = container.resolve(TmdbApiService);

export default function Movies() {
  const { t, i18n } = useTranslation();

  const onSearch = async (term: string) => {
    console.log(term, i18n.language);
    const response = await tmdbApiService.search(term, i18n.language);

    console.log(response.results.forEach((m) => console.log(m.title)));
  };

  return (
    <Box>
      <SearchBar
        placeholder={t(i18nMap.movies.searchBar.placeholder)}
        onSearch={onSearch}
      />
    </Box>
  );
}
