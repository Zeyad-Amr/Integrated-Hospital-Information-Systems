import React from "react";
import { Box } from "@mui/system";

const HeaderText = (props : {title : string}) => {
  return <Box sx={{
    textAlign:'center',
    width:'100%',
    // fontWeight: 'bold',
    fontSize: '1rem',
  }}>{ props.title }</Box>;
};

export default HeaderText;
