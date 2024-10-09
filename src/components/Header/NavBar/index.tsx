import { Tab, Tabs } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export default function NavBar() {
  const isHomePage = !!useMatch("/");
  const isSearchPage = !!useMatch("/search");

  const [value, setValue] = useState(-1);

  useEffect(() => {
    let selectedIndex = -1;
    if (isHomePage) selectedIndex = 0;
    if (isSearchPage) selectedIndex = 1;

    setValue(selectedIndex);
  }, [isHomePage, isSearchPage]);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newIndex: number) => {
      setValue(newIndex);
    },
    [setValue]
  );

  const navigate = useNavigate();
  const goto = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
      event.preventDefault();
      navigate(href);
    },
    [navigate]
  );

  return (
    <Tabs role="navigation" value={value} onChange={handleChange}>
      <Tab
        label="home"
        component="a"
        aria-current={isHomePage}
        onClick={(e) => goto(e, "/")}
      />

      <Tab
        label="search"
        component="a"
        aria-current={isSearchPage}
        onClick={(e) => goto(e, "/search")}
      />
    </Tabs>
  );
}
