import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";

interface SearchableSelectFieldPropsInterface {
  options: string[];
  label: string;
  error?: string;
  touched?: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  value: string;
  name: string;
  disabled?: boolean;
}

const SearchableSelectFieldComponent = ({
  options,
  label,
  error,
  touched,
  value,
  onChange,
  name,
  disabled = false,
}: SearchableSelectFieldPropsInterface) => {
  return (
    <Autocomplete
      id="searchable-select"
      options={options}
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option}>
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          helperText={error && touched ? error : ""}
          error={error && touched ? true : false}
          disabled={disabled}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      value={value}
      onChange={(_event, newValue) => {
        // Create a synthetic event for Formik
        const syntheticEvent = {
          target: {
            name,
            value: newValue || "", // Handle cases where newValue is null
          },
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(syntheticEvent);
      }}
      disabled={disabled}
    />
  );
};

export default SearchableSelectFieldComponent;
