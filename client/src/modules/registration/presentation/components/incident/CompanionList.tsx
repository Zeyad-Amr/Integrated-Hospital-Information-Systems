import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";

interface CompanionListProps {
  companionsArray: PersonInterface[]
  setCompanionFormValues: any
  setEditing?: () => {}
  // getIdx,
  // submitted,
}

const CompanionList = ({
  companionsArray = [],
  setCompanionFormValues,
  // setEditing,
  // getIdx,
  // submitted,
}: CompanionListProps) => {

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
                // marginBottom: "0.5rem",
                backgroundColor:
                  // idx === select && submitted !== false
                  // ? 
                  "white",
                // : "transparent",
                padding: "0.4rem 1rem",
                alignItems: "center",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                console.log(companion)
                setCompanionFormValues(companion)
                // setEditing(true),
                // getIdx(idx),
                // setSelect(idx)
              }}
            >
              <Typography>
                {companion.firstName}&nbsp;{companion.secondName}
              </Typography>
              <EditRoundedIcon sx={{ fontSize: "1rem" }} />
            </Box>
          ))}
      </Box>
    </Box >
  );
};

export default CompanionList;
