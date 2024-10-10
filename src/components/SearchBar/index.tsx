import React, { useState } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./classes.module.css";

type Props = {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
};

export default function SearchBar({ placeholder, onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch?.(searchTerm);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onSearch?.(searchTerm);
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <Box className={classes.searchIcon} onClick={handleClick}>
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            </Box>
          ),
        },
      }}
      onKeyDown={handleKeyDown}
      variant="outlined"
      fullWidth
    />
  );
}
