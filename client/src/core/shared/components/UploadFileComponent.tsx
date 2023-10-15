import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { uploadFile } from "../utilities/uploadFile";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import { FileObject } from "../utilities/uploadFile";

interface UploadFileComponentProps {
  value: FileObject | undefined;
  onChange: (value: FileObject) => void;
  error: string | undefined;
  touched: boolean | undefined;
  width: number;
  label: string;
}

const UploadFileComponent = ({
  value,
  onChange,
  error,
  touched,
  width,
  label,
}: UploadFileComponentProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: width,
          margin: "0",
        }}
      >
        <Button
          variant="outlined"
          component="label"
          sx={{
            m: 1,
            minWidth:
              value?.id && value?.id !== "uploading" ? width * 0.75 : width,
            minHeight: 50,
            backgroundColor: "white",
            borderColor: error && touched ? "red" : "grey",
          }}
          startIcon={
            value?.id === "uploading" ? (
              <div></div>
            ) : value?.id ? (
              <CheckCircleIcon />
            ) : (
              <UploadIcon color="primary" />
            )
          }
        >
          {value?.id === "uploading" ? (
            <CircularProgress />
          ) : value?.id ? (
            `${label} (Uploaded)`
          ) : (
            label
          )}

          <input
            type="file"
            hidden
            accept="*"
            onChange={(e) => {
              const file: File | null = e.target.files?.item(0) ?? null;
              if (file) {
                onChange({ ...FileObject.defaultValues(), id: "uploading" });
                console.log(file);
                uploadFile(file).then((res) => {
                  onChange(res);
                  console.log(value);
                });
              }
            }}
          />
        </Button>
        {value?.id && value?.id !== "uploading" ? (
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={() => {
              window.open(value.url, "_blank");
            }}
          >
            <AttachFileIcon color="primary" />
            View File
          </Button>
        ) : (
          <div></div>
        )}
      </Box>

      {error && touched && value?.id !== "uploading" ? (
        <FormHelperText
          sx={{
            color: "red",
            margin: "-0.3rem 1.5rem 0.5rem 1.5rem",
            width: width,
          }}
        >
          {error}
        </FormHelperText>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default UploadFileComponent;
