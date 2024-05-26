import React from "react";
import { Box } from "@mui/system";
import RoomsTable from "../../components/rooms/RoomsTable";

const Rooms = () => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "70vh",
        margin: "0 auto 0",
      }}
    >
      <RoomsTable />
    </Box>
  );
};

export default Rooms;
