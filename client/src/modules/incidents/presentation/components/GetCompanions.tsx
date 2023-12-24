import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const GetCompanions = ({
  companionsArray,
  setIntialValues,
  setEditing,
  getIdx,
}: any) => {

  const [select, setSelect] = useState<number>();
  return (
    <Box sx={{ padding: "1rem", height: "100%" }}>
      <Typography
        sx={{ fontWeight: "600", marginBottom: "1rem", textAlign: "center" }}
      >
        المـــرافقون
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          overflowY: "auto",
          height: "90%",
        }}
      >
        {companionsArray.length === 0
          ? "لا يـــوجد مــرافقون"
          : companionsArray.map((companion: any, idx: number) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: idx === select ? "white" : "transparent",
                  padding: "0.4rem 1rem",
                  alignItems: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => (
                  setIntialValues(companion),
                  setEditing(true),
                  getIdx(idx),
                  setSelect(idx)
                )}
              >
                <Typography>
                  {companion.firstName}&nbsp;{companion.secondName}
                </Typography>
                <EditRoundedIcon sx={{ fontSize: "1rem" }} />
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default GetCompanions;
