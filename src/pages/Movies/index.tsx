import { Box } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { i18nMap } from "../../i18n/map";
import { useTranslation } from "react-i18next";

export default function Movies() {
  const { t } = useTranslation();

  return (
    <Box>
      <SearchBar
        placeholder={t(i18nMap.movies.searchBar.placeholder)}
        onSearch={(term) => console.log(term)}
      />
    </Box>
  );
}
