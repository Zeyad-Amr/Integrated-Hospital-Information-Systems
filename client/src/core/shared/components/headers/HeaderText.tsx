import React from "react";
import { Box } from "@mui/system";

const HeaderText = (props : {title : string}) => {
  return <Box sx={{
    margin:' 2rem 0rem',
    fontWeight: 'bold',
    fontSize: '2rem',
  }}>{ props.title }</Box>;
};

export default HeaderText;
