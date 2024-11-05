import { Tab, Tabs } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";
import { i18nMap } from "../../../i18n/map";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const isHomePage = !!useMatch("/");
  const isMoviesPage = !!useMatch("/movies/*");

  const value = isHomePage ? 0 : isMoviesPage ? 1 : false;

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Tabs role="navigation" value={value}>
      <Tab
        label={t(i18nMap.header.nav.home)}
        component="a"
        aria-selected={isHomePage}
        onClick={() => {
          navigate("/");
        }}
      />

      <Tab
        label={t(i18nMap.header.nav.movies)}
        component="a"
        aria-selected={isMoviesPage}
        onClick={() => {
          navigate("/movies");
        }}
      />
    </Tabs>
  );
}
