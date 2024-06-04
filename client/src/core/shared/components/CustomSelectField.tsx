import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { FormikErrors, FormikTouched } from "formik";

export interface SelectFieldProps<T> {
  onChange: (event: SelectChangeEvent<T> | unknown, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
  name: string;
  label: string;
  error?: string | undefined | FormikErrors<T>;
  touched?: boolean | undefined | FormikTouched<T>;
  value: T | any;
  options: T[];
  defaultValue?: { id: any; value: string };
  isRequired?: boolean;
  width?: number | string;
  hideLabel?: boolean;
  multiple?: boolean;
  sx?: any;
}

const CustomSelectField = <T extends { id: any; value: string }>({
  onChange,
  onBlur,
  name,
  label,
  error,
  touched,
  value,
  options = [],
  // defaultValue = { id: 0, value: "" },
  isRequired = false,
  width,
  sx,
  multiple = false,
  hideLabel = true,
}: SelectFieldProps<T>) => {
  // Create a new array with the default value added to the beginning
  const updatedOptions = [...options];

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
        sx={{ marginTop: 1.1, width: { width }, maxWidth: "100%", ...sx }}
      >
        <InputLabel>{label}</InputLabel>

        <Select
          multiple={multiple ?? false}
          label={label}
          onChange={(event: SelectChangeEvent<T>, child: ReactNode) => {
            onChange(event, child);
          }}
          onBlur={onBlur}
          sx={{
            backgroundColor: "#fff",
            height: "3.5rem",
          }}
          value={multiple ? (Array.isArray(value) ? value : []) : value}
          name={name}
          error={error && touched ? true : false}
          displayEmpty
          renderValue={(selected: unknown) => {
            // if (
            //   !selected ||
            //   (Array.isArray(selected) && selected.length === 0)
            // ) {
            //   return (
            //     <span style={{ color: "gray", opacity: "0.6" }}>
            //       اختر عنصر من القائمة
            //     </span>
            //   );
            // }
            if (Array.isArray(selected)) {
              return selected
                .map(
                  (val) => options.find((option) => option.id === val)?.value
                )
                .join(", ");
            }
            const selectedOption = options.find(
              (option) => option.id === selected
            );
            return selectedOption ? selectedOption.value : "";
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {updatedOptions?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                // backgroundColor : "#232836",
                color: "#232836",
                opacity: !multiple ? 0.6 : 0.9,
                transitionDuration: "0.5s ease",
                margin: 1,
                ...sx,
                // selected background color
                "&.Mui-selected": {
                  backgroundColor: !multiple ? "primary.dark" : "none",
                  color: !multiple ? "#fff" : "#232836",
                  opacity: 0.9,
                },
                // hover background color
                "&:hover": {
                  opacity: !multiple ? 0.6 : 0.9,
                  color: "#232836",
                },
                "&.Mui-selected:hover": {
                  opacity: 0.9,
                  backgroundColor: !multiple ? "primary.dark" : "none",
                  color: !multiple ? "#fff" : "#232836",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ListItemText primary={option.value} />
                {multiple && (
                  <Checkbox
                    checked={
                      Array.isArray(value) && value.indexOf(option.id) > -1
                    }
                    sx={{
                      marginRight: 1,
                      "&.Mui-checked": {
                        // backgroundColor: "#fff",
                        color: "primary.dark",
                      },
                    }}
                  />
                )}
              </Box>
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
