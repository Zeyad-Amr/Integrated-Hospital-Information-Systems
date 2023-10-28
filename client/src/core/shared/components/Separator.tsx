import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppColors from "../theme/colors";
const Separator = ({ text }: { text?: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        spacing: 2,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
        width: "95%",
        margin: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginRight: 5,
          color: AppColors.grey[700],
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
      <hr
        style={{
          height: "1px",
          width: "100%",

          backgroundColor: AppColors.primary[100],
        }}
      />
    </Box>
  );
};

export default Separator;
