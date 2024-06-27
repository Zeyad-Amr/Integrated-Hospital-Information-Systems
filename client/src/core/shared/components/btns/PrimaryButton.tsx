import { Button } from "@mui/material";
import React, { forwardRef } from "react";

interface PrimaryButtonTypes {
  id?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  title: string;
  onClick?: () => void;
  display?: string;
  sx?: any;
}

const PrimaryButton = forwardRef<any, PrimaryButtonTypes>(
  ({ id, type, title, onClick, display, sx }, ref) => {
    return (
      <Button
        id={id}
        sx={{
          display: display,
          color: "#fff",
          backgroundColor: "#0f70f2",
          fontSize: "0.9rem",
          height: "40px",
          padding: "0 3rem",
          '&:hover': {
            backgroundColor: "#0f70f2",
          },
          ...sx,
        }}
        onClick={onClick}
        type={type}
        ref={ref}
      >
        {title}
      </Button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";
export default PrimaryButton;
