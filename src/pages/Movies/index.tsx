import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from "react-i18next";
import { i18nMap } from "../../i18n/map";

function search(term: string, lang: string) {
  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "Your_API_Key";

  fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&language=${lang}
    &query=${term}&page=1&include_adult=false`
  )
    .then((r) => r.json())
    .then((data) =>
      data.results.forEach((movie: any) =>
        console.log(`${movie.title} : ${movie.description}`)
      )
    );
}

export default function Movies() {
  const { t, i18n } = useTranslation();

  const onSearch = (term: string) => {
    console.log(term, i18n.language);
    search(term, i18n.language);
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
