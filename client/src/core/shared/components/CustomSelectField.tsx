import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormikErrors, FormikTouched } from "formik";

export interface SelectFieldProps<T> {
  onChange: (event: SelectChangeEvent<T>, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
  name: string;
  label: string;
  error: string | undefined | FormikErrors<T>;
  touched: boolean | undefined | FormikTouched<T>;
  value: T | undefined;
  options: T[];
  isRequired?: boolean;
  width?: number | string;
  hideLabel?: boolean;
}

const CustomSelectField = <T extends { id: any; value: string }>({
  onChange,
  onBlur,
  name,
  label,
  error,
  touched,
  value,
  options,
  isRequired = false,
  width,
  hideLabel = true,
}: SelectFieldProps<T>) => {
  return (
    <Box
      sx={{
        mb: 2,
        width: width,
        maxWidth: "100%",
      }}
    >
      {!hideLabel && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "0.9rem !important",
            margin: "0rem 0.5rem",
          }}
        >
          {label} {isRequired && <span style={{ color: "#FF5630" }}>*</span>}
        </Typography>
      )}

      <FormControl
        required={isRequired}
        sx={{ marginTop: 1.1, width: { width }, maxWidth: "100%" }}
      >
        <InputLabel>{label}</InputLabel>

        <Select
          label={label}
          onChange={(event: SelectChangeEvent<T>, child: ReactNode) => {
            onChange(event, child);
            console.log(event.target.value);
          }}
          onBlur={onBlur}
          sx={{
            backgroundColor: "#fff ",
            height: "3.5rem",
          }}
          value={value?.id}
          name={name}
          error={error && touched ? true : false}
          hidden={hideLabel}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {options.map((option: T) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                // backgroundColor : "#232836",
                opacity: 0.8,
                color: "#232836",
                transitionDuration: "0.5s ease",
                margin: 1,
                // selected background color
                "&.Mui-selected": {
                  // backgroundColor: "#232836",
                  // color: "white",
                  // margin: 1,
                  // borderRadius: 25,
                },
                // hover background color
                "&:hover": {
                  // backgroundColor: "green",
                  // color: "white",
                  // margin: 1,
                  // borderRadius: 25,
                },
              }}
            >
              {option.value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          sx={{
            color: "#FF5630",
            fontSize: "12px",
          }}
        >
          {error && touched ? String(error) : null}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomSelectField;
