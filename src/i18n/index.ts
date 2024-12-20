import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./dictionnaries/en";
import { fr } from "./dictionnaries/fr";

i18n.use(initReactI18next).init({
  resources: {
    en,
    fr,
  },
  lng: "en",
  fallbackLng: "en",
});

export default i18n;
