import { Autocomplete, Box, SelectChangeEvent, TextField } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import React, { ReactNode } from "react";

interface SearchableSelectFieldPropsInterface<T> {
  options: { id: any; value: string }[];
  error?: string | undefined | FormikErrors<T>;
  touched?: boolean | undefined | FormikTouched<T>;
  onChange: (event: SelectChangeEvent<T> | unknown, child: ReactNode) => void;
  value: T | any;
  name: string;
}

const SearchableSelectFieldComponent = <T extends { id: any; value: string }>({
  options,
  error,
  touched,
  value,
  onChange,
  name
}: SearchableSelectFieldPropsInterface<T>) => {
  return (
    <Autocomplete
      id="searchable-select"
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => {
        return (
          <Box component="li" {...props} key={option.id}>
            {option.value}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          // helperText={error && touched ? error : ""}
          error={ error && touched ? true : false}
        />
      )}
      value={value.client}
      onChange={(e, value) => {
        const event = {
          ...e,
          target: { ...e.target, name: "client", value: value },
        };
        onChange(event,null);
      }}
    />
  );
};

export default SearchableSelectFieldComponent;
