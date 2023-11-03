import React from "react";
import "./HeaderText.css";

const HeaderText = (props : {title : string}) => {
  return <div className="create-user-header">{ props.title }</div>;
};

export default HeaderText;
