import Box from "@mui/material/Box";
const TestPage = ({ label = "Test" }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.contrastText",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "h1.fontSize",
          fontWeight: "fontWeightBold",
        }}
      >
        {Array.from(Array(20).keys()).map((item, index) => {
          return (
            <div key={index}>
              {label} {index}
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default TestPage;
