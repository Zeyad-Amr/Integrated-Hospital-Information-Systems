import { Box, Grid, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React from "react";
import GetCompanions from "./GetCompanions";
// import {QRCodeCanvas} from 'qrcode.react';

// const GetCompanions = (props: any) => {
//   if (companionsArray.length > 0) {
//     companionsArray.map((companion : any) => {
//       <Typography>
//         `${companion.firstName} ${companion.secondName}`
//       </Typography>;
//     });
//   }

//   return GetCompanions;
// };

interface IncidentHeaderProps {
  Companions: {}[];
  data: any;
  display: string;
  onClick: () => void;
}

// export const GetCompanions = ({companionsArray}: any) => {
//   return (
//     <Box sx={{display:'flex', flexDirection:'column', padding:'0 0.5rem'}}>
//       {companionsArray.map((companion: any, idx: number) => (
//         <Typography key={idx}>
//           {companion.firstName}&nbsp;{companion.secondName}
//         </Typography>
//       ))}
//     </Box>
//   );
// };

const IncidentHeader = ({
  Companions,
  data,
  display,
  onClick,
}: IncidentHeaderProps) => {
  return (
    <Box sx={{ display: display, marginBottom: "1rem" }}>
      {/* <QRCodeCanvas style={{marginLeft:'1rem'}} value={`
            عدد المرضى : ${data.numOfPatients}
            قادم من : ${data.comeFromString === "1" ? "حادث" : "خناقة"}
            المسعف : ${data.paramedicName}
            سيارة الاسعاف : ${data.ambCarNum}
            `} /> */}
      <Grid
        container
        columns={5}
        sx={{
          backgroundColor: "primary.dark",
          color: "white",
          borderRadius: "10px",
          padding: "1rem",
          alignItems: "center",
        }}
      >
        <Grid item lg={1} md={1} sm={5} xs={5} sx={{ display: "flex" }}>
          <Typography>عدد المرضى :</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            &nbsp;{data.numOfPatients}
          </Typography>
        </Grid>
        <Grid
          item
          lg={1}
          md={1}
          sm={5}
          xs={5}
          sx={{ display: "flex", cursor: "default" }}
        >
          <Tooltip
            title={
              Companions.length === 0 ? (
                "لا يوجد مرافقين"
              ) : (
                <GetCompanions companionsArray={Companions} />
              )
            }
            arrow
            placement="bottom"
          >
            <Box sx={{ display: "flex" }}>
              <Typography>عدد المرافقين :</Typography>
              <Typography sx={{ fontWeight: "500" }}>
                &nbsp;{Companions.length}
              </Typography>
            </Box>
          </Tooltip>
        </Grid>
        <Grid item lg={1} md={1} sm={5} xs={5} sx={{ display: "flex" }}>
          <Typography>قادم من :</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            &nbsp;
            {data.description === "home"
              ? "منزل"
              : data.description === "accedent"
              ? "حادث"
              : "سجن"}
          </Typography>
        </Grid>
        <Grid item lg={1} md={1} sm={5} xs={5} sx={{ display: "flex" }}>
          <Typography>المسعف :</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            &nbsp;{data.attendantName}
          </Typography>
        </Grid>
        <Grid item lg={1} md={1} sm={5} xs={5} sx={{ display: "flex" }}>
          <Typography>سيارة الاسعاف :</Typography>
          <Typography sx={{ fontWeight: "500" }}>
            &nbsp;{data.car.firstChar} &nbsp;{data.car.secondChar} &nbsp;
            {data.car.thirdChar} &nbsp;{data.car.number}
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: "#eee",
          padding: "1rem",
          margin: "0 0 0rem 1rem",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <EditRoundedIcon />
      </Box>
    </Box>
  );
};

export default IncidentHeader;
