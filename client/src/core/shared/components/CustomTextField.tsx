import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
export interface TextFieldProps {
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
  value: string | number | undefined | null;
  isRequired?: boolean;
  width?: number;
  props?: any;
}

const CustomTextField = ({
  onChange,
  onBlur,
  name,
  label,
  error,
  touched,
  value,
  props,
  isRequired = false,
  width = 800,
}: TextFieldProps) => {
  const textfieldProps = {
    FormHelperTextProps: { sx: { color: "red" } },
    InputProps: { sx: { backgroundColor: "white" } },
    InputLabelProps: { shrink: true },
  };
  return (
    <Box
      sx={{
        "& .MuiTextField-root": {
          width: 800,
          maxWidth: "100%",
          marginTop: 0.5,
        },
        mb: 2,
        width: { width },
        maxWidth: "100%",
      }}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        required={isRequired}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        helperText={error && touched ? error : ""}
        error={!!(error && touched)}
        {...textfieldProps}
        {...props}
      />
    </Box>
  );
};

export default CustomTextField;
