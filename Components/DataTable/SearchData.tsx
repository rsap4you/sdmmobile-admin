"use client";
import React from "react";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchData = ({ handleSearch, handleAdd, isAdd = false, addLabel = "Add" }: any) => {
  const [value, setValue] = React.useState("");

  const change = (v: string) => {
    setValue(v);
    handleSearch(v);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={value}
        onChange={(e) => change(e.target.value)}
        sx={{ maxWidth: 250 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton onClick={() => change("")} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
      {isAdd && (
        <button className="btn btn-primary" onClick={() => handleAdd(true)}>
          {addLabel}
        </button>
      )}
    </Box>
  );
};

export default SearchData;
