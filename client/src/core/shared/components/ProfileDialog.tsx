import React from 'react'
import { Box, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const ProfileDialog = (props: any) => {

  return (
    <Box sx={{
        position:"absolute",
        marginTop: '0.5rem',
        marginLeft: '-5rem',
        width: "15rem", 
        backgroundColor:"#fff",
        filter: "drop-shadow(0px 0px 6px #0000004f);",
        borderRadius:"10px",
        // transition:"0.1s",
        opacity: props.opacity,
        visibility: props.display,
        padding: '2rem 1rem 1rem',
        zIndex:'1000',
        pointerEvents:'none',
    }}>

        <Box sx={{display:'flex', flexDirection: 'column', color:'primary.main', alignItems:'center', marginBottom:'2rem', }}>
            <AccountCircleRoundedIcon sx={{fontSize:'5rem'}}/>
            <Box sx={{display:'flex',justifyContent:'space-evenly', width:'70%'}}>اهلاً  
                <Typography sx={{fontWeight:'bold'}}>{props.name}</Typography>
            </Box>
        </Box>
        <Box sx={{width:'100%', display:'flex', color:'primary.main', cursor:'pointer',transition:'0.2s',padding:'10px 20px',borderRadius:'5px', pointerEvents:'auto !important', '&:hover': {backgroundColor:'primary.lighter'}}}>
            <PersonIcon sx={{fontSize:'1.5rem'}}/>
            <Typography sx={{marginLeft:'1rem', fontSize:'0.9rem', fontWeight:'semibold'}}>
                حسابي
            </Typography>
        </Box>
        <Box sx={{width:'100%', display:'flex', color:'red', cursor:'pointer',transition:'0.2s',padding:'10px 20px',borderRadius:'5px', pointerEvents:'auto !important', '&:hover': {backgroundColor:'primary.lighter'}}}>
            <LogoutIcon sx={{fontSize:'1.5rem'}}/>
            <Typography sx={{marginLeft:'1rem', fontSize:'0.9rem', fontWeight:'semibold'}}>
                تسجيل الخروج
            </Typography>
        </Box>
    </Box>
  )
}

export default ProfileDialog