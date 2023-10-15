import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import { ProductOption } from "../../modules/Products/models/ProductOption";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import AppColors from "../theme/colors";
import Typography from "@mui/material/Typography";
export interface MultiSelectFieldProps {
  onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
  name: string;
  label: string;
  error: string | string[] | undefined;
  touched: boolean | undefined;
  value: string[];
  options: ProductOption[];
  isRequired?: boolean;
  width?: number;
}

const CustomMultiSelectField = ({
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
}: MultiSelectFieldProps) => {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </Typography>

      <FormControl
        required={isRequired}
        sx={{ marginTop: 0.5, width: { width }, maxWidth: "100%" }}
      >
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          onChange={onChange}
          onBlur={onBlur}
          multiple
          value={value}
          name={name}
          error={error && touched ? true : false}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {options
                .filter((val) => selected.includes(val.id))
                .map((item) => (
                  <Chip
                    key={item.id}
                    label={item.name}
                    sx={{
                      "& .MuiChip-label": {
                        color: "black",
                      },
                    }}
                  />
                ))}
            </Box>
          )}
          sx={{
            backgroundColor: "white",
          }}
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
                  backgroundColor: AppColors.primary[700],
                  color: "white",
                  margin: 1,
                  borderRadius: 25,
                },
                // hover background color
                "&:hover": {
                  backgroundColor: AppColors.primary[100],
                  color: "white",
                  margin: 1,
                  borderRadius: 25,
                },
                margin: 1,
                borderRadius: 25,
              }}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          sx={{
            color: "#e20029",
          }}
        >
          {error && touched ? error : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomMultiSelectField;
