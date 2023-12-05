import { Box, Grid, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React from "react";
// import {QRCodeCanvas} from 'qrcode.react';

const IncidentHeader = (props: any) => {
  // console.log(props.data)
  return (
    <Box sx={{ display: props.display, marginBottom: "2rem" }}>
      {/* <QRCodeCanvas style={{marginLeft:'1rem'}} value={`
            عدد المرضى : ${props.data.numOfPatients}
            قادم من : ${props.data.comeFromString === "1" ? "حادث" : "خناقة"}
            المسعف : ${props.data.paramedicName}
            سيارة الاسعاف : ${props.data.ambCarNum}
            `} /> */}
      <Grid
        container
        sx={{
          backgroundColor: "primary.dark",
          color: "white",
          borderRadius: "10px",
          padding: "1rem",
          alignItems: "center",
        }}
      >
        <Grid item lg={3} md={3} sm={6} xs={12} sx={{ display: "flex" }}>
          <Typography>عدد المرضى :</Typography>
          <Typography sx={{ fontWeight: "600" }}>
            &nbsp;{props.data.numOfPatients}
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12} sx={{ display: "flex" }}>
          <Typography>قادم من :</Typography>
          <Typography sx={{ fontWeight: "600" }}>
            &nbsp;{props.data.description === "home"? "منزل": (props.data.description === "accedent" ? "حادث" : "سجن")}
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12} sx={{ display: "flex" }}>
          <Typography>المسعف :</Typography>
          <Typography sx={{ fontWeight: "600" }}>
            &nbsp;{props.data.attendantName}
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12} sx={{ display: "flex" }}>
          <Typography>سيارة الاسعاف :</Typography>
          <Typography sx={{ fontWeight: "600" }}>
            &nbsp;{props.data.car.firstChar} &nbsp;{props.data.car.secondChar} &nbsp;
            {props.data.car.thirdChar} &nbsp;{props.data.car.number}
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
        onClick={props.onClick}
      >
        <EditRoundedIcon />
      </Box>
    </Box>
  );
};

export default IncidentHeader;
