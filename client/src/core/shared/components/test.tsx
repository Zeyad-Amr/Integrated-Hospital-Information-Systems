import Label from "@/core/components/label/label";
import Box from "@mui/material/Box";
const TestPage = ({ label = "Test" }) => {
  return (
    <Box
      sx={{
        fontSize: "h1.fontSize",
        fontWeight: "fontWeightBold",
      }}
    >
      <div>{label}</div>
      {/* {Array.from(Array(20).keys()).map((item, index) => {
          return (
            <div key={index+1}>
              {label} {index+1}
            </div>
          );
        })} */}
    </Box>
  );
};

export default TestPage;
