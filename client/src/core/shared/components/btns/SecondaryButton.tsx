import { Button } from '@mui/material'
import React from 'react'

const SecondaryButton = (props: any) => {
  return (
    <Button
        type={props.type}
        style={{
            display: props.display,
            color: "#004B50",
            backgroundColor: 'transparent',
            width: "10rem",
            fontSize:"0.9rem",
            margin : "1rem 0rem 2rem 1rem",
            height: "40px",
            border: '1px solid #004B50'
        }}
        onClick={props.onClick}
        >
        {props.title}
    </Button>
  )
}

export default SecondaryButton