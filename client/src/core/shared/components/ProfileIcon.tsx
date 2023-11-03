import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box, Typography} from "@mui/material";
import ProfileDialog from './ProfileDialog';
import { useState } from 'react';

const ProfileIcon = (props: any) => {
    const [dialogVisibility, setDialogVisibility] = useState({
        opacity: 0,
        display: 'none',
    })
    const toggleProfileDialog = () => {
        dialogVisibility.opacity ? setDialogVisibility({opacity: 0, display: 'hidden'}) : setDialogVisibility({opacity: 1, display: 'visible'})
        }

    return (
    <Box sx={{position:'relative'}}>

        <Box sx={{display: "flex", alignItems: "center", cursor:"pointer", paddingRight:'20px'}} onClick={toggleProfileDialog}>
            <AccountCircleRoundedIcon 
            sx={{
                color: "white",
                fontSize: "3.1rem"
            }}
            />
            <Box sx={{
                marginLeft: ".6rem",
            }}>
                <Typography sx={{color:"white", fontSize: '0.9rem', fontWeight:"600",textAlign:'left'}}>
                    {props.name}
                </Typography>
                <Typography sx={{color:"lightGrey", fontSize: '.7rem',textAlign:'left'}}>
                    {props.pos}
                </Typography>
            </Box>
        </Box>
        <ProfileDialog opacity = {dialogVisibility.opacity} display = {dialogVisibility.display} name = {props.name}/>
    </Box>
    )
}

export default ProfileIcon