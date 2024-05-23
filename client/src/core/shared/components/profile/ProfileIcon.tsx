import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box, Typography } from "@mui/material";
import ProfileDialog from "./ProfileDialog";
import { useEffect, useRef, useState } from "react";

const ProfileIcon = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        ref={popperRef}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          paddingRight: "20px",
        }}
        onClick={handleClick}
      >
        <AccountCircleRoundedIcon
          sx={{
            color: "primary.darker",
            fontSize: "3.1rem",
          }}
        />
        <Box
          sx={{
            marginLeft: ".6rem",
          }}
        >
          <Typography
            sx={{
              color: "primary.darker",
              fontSize: "0.9rem",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            {props.name}
          </Typography>
          <Typography
            sx={{ color: "primary.main", fontSize: ".7rem", textAlign: "left" }}
          >
            {props.pos}
          </Typography>
        </Box>
      </Box>
      <ProfileDialog
        opacity={anchorEl ? 1 : 0}
        display={anchorEl ? "block" : "none"}
        name={props.name}
      />
    </Box>
  );
};

export default ProfileIcon;
