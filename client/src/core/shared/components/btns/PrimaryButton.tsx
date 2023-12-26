import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = (props: any) => {
  return (
    <Button
      id={props.id}
      type={props.type}
      style={{
        display: props.display,
        color: "#fff",
        backgroundColor: "#0f70f2",
        fontSize: "0.9rem",
        height: "40px",
        padding: "0 3rem",

        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

export default PrimaryButton;
