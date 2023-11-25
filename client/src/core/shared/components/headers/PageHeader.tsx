import HeaderText from '@/core/shared/components/headers/HeaderText'
import { Box } from '@mui/system'
import React from 'react'

const PageHeader = (props: any) => {

    const updatedChildren = React.cloneElement(
        props.children,
        { sx: { ...props.children.props.style,
            position:'absolute',
            right:'1rem',
            fontSize:'11.2rem',
            color:'white',
            filter: "drop-shadow(5px 5px 6px #0000008f);",
        } }
    )
    
    return (
    <Box sx = {{
        position:'relative',
        backgroundColor:'primary.darker',
        color:'white' ,
        padding: '0.2rem 2rem',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
        }}>

        {updatedChildren}  
        <HeaderText title={props.title} />
    </Box>
    )
}

export default PageHeader