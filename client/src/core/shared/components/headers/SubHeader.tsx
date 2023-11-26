import { Box, Typography } from '@mui/material'
import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SubHeader = (props:any) => {
  return (
        <Box sx={{width:'100%', marginBottom:'2rem'}}>
            <Box sx={{width:'100%', height:'0.3rem', backgroundColor:'primary.darker'}}></Box>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
              <Box sx={{display:'flex', alignItems:'center',justifyContent:'center', width:'30%', height:'3rem', backgroundColor:'primary.darker', borderBottomLeftRadius:'10px',  borderBottomRightRadius:'10px'}}>
                  <Typography sx={{color:'white', fontSize:'1.2rem', fontWeight:'600'}}>{props.SubHeaderText}</Typography>
              </Box>
              <Box 
              sx={{display:'flex', alignItems:'center',justifyContent:'center', width:'5%', height:'3rem', backgroundColor:'primary.darker', borderBottomLeftRadius:'10px',  borderBottomRightRadius:'10px', cursor:'pointer'}}
              onClick={()=>{
                props.compStateChanger('none');
                props.compBtnStateChanger('block');
                props.setAddCompanionKey(false)
                }}
              >
                <CloseRoundedIcon sx={{color:'white'}}/>
              </Box>
            </Box>
        </Box>
  )
}

export default SubHeader