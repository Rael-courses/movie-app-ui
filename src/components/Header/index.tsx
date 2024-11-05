import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import classes from "./classes.module.css";
import { useTranslation } from "react-i18next";
import { i18nMap } from "../../i18n/map";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { t } = useTranslation();
  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography component="h1" variant="h5">
          {t(i18nMap.header.title)}
        </Typography>

        <Typography variant="body2">{t("header.description")}</Typography>

        <NavBar />
      </Box>

      <Box>
        <LanguageSelector />
      </Box>
    </Box>
  );
}
