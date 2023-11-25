import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export interface SelectFieldProps {
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
  name: string;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
  value: string;
  options: {id: string , title : string}[];
  isRequired?: boolean;
  width?: number | string;
  hideLabel?: boolean;
}

const CustomSelectField = ({
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
  hideLabel = true
}: SelectFieldProps) => {
  return (
    <Box
      sx={{
        mb: 2,
        width : width,
        maxWidth: "100%",
      }}
    >
      {!hideLabel && (
        <Typography variant="h6"  component="div" sx={{ flexGrow: 1 , fontSize : "0.9rem !important" , margin : "0rem 0.5rem" }}>
          {label} {isRequired && <span style={{ color: "#FF5630" }}>*</span>}
        </Typography>
      )}

      <FormControl
        required={isRequired}
        sx={{ marginTop: 1.1, width: { width }, maxWidth: "100%" }}
      >
        <InputLabel>{label}</InputLabel>

        <Select
          // labelId="demo-simple-select-required-label"
          // id="demo-simple-select-helper"
          // defaultValue={options[0].title}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          sx={{
            backgroundColor: "#fff ",
            height: "3.5rem",
          }}
          // label={label}
          value={value}
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
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                // backgroundColor : "#232836",
                opacity : 0.8,
                color: "#232836",
                transitionDuration : "0.5s ease",
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
              {option.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          sx={{
            color: "#FF5630",
            fontSize : "12px"
          }}
        >
          {error && touched ? error : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomSelectField;
