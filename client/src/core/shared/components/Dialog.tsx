import { Box } from '@mui/system'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React from 'react'
import {  Typography } from '@mui/material';


const Dialog = (props: any) => {
  return (
    <Box sx={{display:props.display}}>
        <Box sx={{position:'fixed',top:'0', left:'0', width:'100%', height:'100%', backgroundColor:'#000000aa',zIndex:'1000',filter:'blur(0.5px)'}} ></Box>
        <Box sx={{padding:'2rem', position:'fixed',top:'0', left:'0', width:'100%', height:'100%', zIndex:'1001'}}>
            <Box sx={{position:'relative', backgroundColor:'white', width:'100%', height:'100%', borderRadius:'15px', }}>
                <Box sx={{
                  backgroundColor:'primary.dark',
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center',
                  padding:'.25rem 2rem',
                  borderTopLeftRadius:'15px',
                  borderTopRightRadius:'15px'
                  }}>
                  <CloseRoundedIcon sx={{color:'white',margin:'0.5rem', fontSize:'2rem', cursor:'pointer'}} onClick={()=>props.DialogStateController('none')}/>
                  <Typography sx={{color:'white', fontWeight:'600'}}>{props.title}</Typography>
                </Box>
                  {props.children}
            </Box>

        </Box>
    </Box>
  )
}

export default Dialog