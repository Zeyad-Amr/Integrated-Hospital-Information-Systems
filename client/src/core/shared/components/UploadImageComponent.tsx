// import UploadIcon from "@mui/icons-material/Upload";
// import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
// import { uploadFile } from "../utilities/uploadFile";
// import FormHelperText from "@mui/material/FormHelperText";
// import Box from "@mui/material/Box";
// import { FileObject } from "../utilities/uploadFile";
// interface UploadImageComponentProps {
//   value: FileObject | undefined;
//   onChange: (value: FileObject) => void;
//   error: string | undefined;
//   touched: boolean | undefined;
//   width: number;
//   height: number;
//   label: string;
// }

// const UploadImageComponent = ({
//   value,
//   onChange,
//   error,
//   touched,
//   width,
//   height,
//   label,
// }: UploadImageComponentProps) => {
//   return (
//     <Box
//       sx={{
//         width: width,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         // on hover, show the upload icon
//         "&:hover": {
//           "& > button": {
//             display: "block",
//           },
//         },
//         "& > button": {
//           display: "none",
//         },
//       }}
//     >
//       <Button
//         variant="outlined"
//         component="label"
//         sx={{
//           padding: "0.5rem",
//           width: width,
//           height: height,
//           backgroundColor: "white",
//           borderColor: error && touched ? "red" : "grey",
//         }}
//       >
//         {value?.id === "uploading" ? (
//           <CircularProgress />
//         ) : value?.id ? (
//           <Box
//             component="img"
//             sx={{
//               padding: 0.3,
//               maxWidth: width,
//               maxHeight: height,
//             }}
//             alt="Company Logo"
//             src={value.url}
//           />
//         ) : (
//           <div>
//             <UploadIcon color="primary" />
//             upload
//           </div>
//         )}

//         <input
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={(e) => {
//             const file: File | null = e.target.files?.item(0) ?? null;

//             if (file !== null) {
//               onChange({ ...FileObject.defaultValues(), id: "uploading" });
//               console.log(file);
//               uploadFile(file).then((res) => {
//                 onChange(res);
//                 console.log(value);
//               });
//             }
//           }}
//         />
//       </Button>

//       <FormHelperText
//         sx={{
//           margin: "0.3rem 0rem 0.5rem 0rem",
//           fontSize: "0.8rem",
//           fontWeight: "bold",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {label}
//       </FormHelperText>

//       {error && touched && value?.id !== "uploading" ? (
//         <FormHelperText
//           sx={{
//             color: "red",
//             margin: "-0.5rem 1.5rem 0.5rem 1.5rem",
//           }}
//         >
//           {error}
//         </FormHelperText>
//       ) : (
//         <div></div>
//       )}
//     </Box>
//   );
// };

// export default UploadImageComponent;
