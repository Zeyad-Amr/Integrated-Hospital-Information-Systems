import { Button } from '@mui/material'
import React from 'react'

const PrimaryButton = (props: any) => {
  return (
    <Button
        type={props.type}
        style={{
            display: props.display,
            color: "#fff",
            backgroundColor: '#004B50',
            width: "15rem",
            fontSize:"0.9rem",
            margin : "1rem 0rem 2rem 1rem",
            height: "40px"
        }}
        onClick={props.onClick}
        >
        {props.title}
    </Button>
  )
}

export default PrimaryButton