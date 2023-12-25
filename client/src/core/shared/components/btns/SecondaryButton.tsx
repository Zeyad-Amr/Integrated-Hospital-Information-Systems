import { Button } from "@mui/material";
import React from "react";

const SecondaryButton = (props: any) => {
  return (
    <Button
      id={props.id}
      type={props.type}
      style={{
        display: props.display,
        color: "#004B50",
        backgroundColor: "transparent",
        fontSize: "0.9rem",
        height: "40px",
        border: "1px solid #004B50",
        padding:'0 3rem',
        ...props.sx
      }}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

export default SecondaryButton;
