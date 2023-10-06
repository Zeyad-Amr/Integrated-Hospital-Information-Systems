import Box from "@mui/material/Box";
const TestPage = ({ label = "Test" }) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.contrastText",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "h1.fontSize",
        fontWeight: "fontWeightBold",
      }}
    >
      {label}
    </Box>
  );
};

export default TestPage;
