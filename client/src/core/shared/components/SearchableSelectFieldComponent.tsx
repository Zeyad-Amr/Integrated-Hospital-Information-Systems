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
  getSearchValue?: (value: string) => void
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
  getSearchValue
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
      sx={{mt:'0.7rem'}}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => getSearchValue ? (event.target.value.length % 3 === 0 ? getSearchValue(event.target.value) : null) : null}

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
      onChange={(_event:any, newValue) => {
        // Create a synthetic event for Formik
        const syntheticEvent = {
          target: {
            name,
            value: newValue || _event.target.value, // Handle cases where newValue is null
          },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }}

      
      disabled={disabled}
    />
  );
};

export default SearchableSelectFieldComponent;
