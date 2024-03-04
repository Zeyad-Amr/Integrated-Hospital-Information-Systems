import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";

interface CompanionListProps {
  companionsArray: PersonInterface[]
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSearchSSN: React.Dispatch<React.SetStateAction<boolean>>
  companionFormRef: any;
  setIndex: React.Dispatch<React.SetStateAction<number>>
  // submitted,
}

const CompanionList = ({
  companionsArray = [],
  setSearchSSN,
  setEditing,
  companionFormRef,
  setIndex,
  // submitted,
}: CompanionListProps) => {

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
          overflowY: "scroll",
          height: "90%",
          maxHeight: "20rem",
        }}
      >
        {companionsArray.length === 0
          ? "لا يـــوجد مــرافقون"
          : companionsArray.map((companion: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                backgroundColor: "white",
                padding: "0.4rem 1rem",
                alignItems: "center",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                console.log(companion)
                if (companionFormRef.current) {
                  companionFormRef.current.setValues(companion)
                }
                setSearchSSN(false)
                setEditing(true)
                setIndex(index)
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
