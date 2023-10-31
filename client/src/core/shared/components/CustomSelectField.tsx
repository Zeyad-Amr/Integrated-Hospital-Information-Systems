import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
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
  width = 800,
  hideLabel = true
}: SelectFieldProps) => {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      {!hideLabel && (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}

      <FormControl
        required={isRequired}
        sx={{ marginTop: 0.5, width: { width }, maxWidth: "100%" }}
      >
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-helper"
          onChange={onChange}
          onBlur={onBlur}
          sx={{
            backgroundColor: "white",
          }}
          value={value}
          name={name}
          error={error && touched ? true : false}
          hidden={hideLabel}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                transform: "translate3d(0, 0, 0)",
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                // selected background color
                "&.Mui-selected": {
                  // backgroundColor: AppColors.primary[700],
                  // color: "white",
                  // margin: 1,
                  // borderRadius: 25,
                },
                // hover background color
                "&:hover": {
                  // backgroundColor: AppColors.primary[100],
                  // color: "white",
                  // margin: 1,
                  // borderRadius: 25,
                },
                margin: 1,
                // borderRadius: 25,
              }}
            >
              {option.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          sx={{
            color: "#FF5630",
          }}
        >
          {error && touched ? error : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomSelectField;
