import { useEffect, useState } from "react";
import { getI18n } from "react-i18next";

export default function useCurrentLang(onChange?: (lang: string) => void) {
  const [currentLang, setCurrentLang] = useState(getI18n().language);

  useEffect(() => {
    const i18n = getI18n();
    const changeLang = (lang: string) => {
      setCurrentLang(lang);
      onChange?.(lang);
    };
    i18n.on("languageChanged", changeLang);

    return () => {
      i18n.off("languageChanged", changeLang);
    };
  }, [onChange]);

  return currentLang;
}
