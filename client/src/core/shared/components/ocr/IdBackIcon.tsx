import { Box } from '@mui/system'
import React from 'react'
import { keyframes } from '@emotion/react';

const moveScanner = keyframes`
  0% { top: 2.5rem; }
  50% { top: calc(100% - 1rem); }
  100% { top: 2.5rem; }
`;
const IdBackIcon = () => {
    return (
        <Box sx={{ width: '30rem', height: 'min-content', position: 'relative' }}>
            <Box className='scanner' sx={{
                width: '100%', height: '1rem', backgroundColor: "#078DEE", position: 'absolute',
                borderRadius: '5px',
                animation: `${moveScanner} 5s infinite`,

            }} />
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 1323.26 898.62" style={{ fill: '#fff' }} >
                <g>
                    <g>
                        <path d="M1261.81,3.33c16.29-0.02,32.58,0.28,48.85-0.14c8.66-0.22,12.61,2.62,12.52,11.79c-0.29,31.1-0.3,62.21,0.02,93.31
			c0.11,10.42-5.38,12.19-14.09,11.93c-8.38-0.25-15.91,0.18-15.62-11.88c0.48-19.74-0.19-39.5,0.25-59.24
			c0.23-10.59-1.89-16.36-14.64-15.86c-22.16,0.88-44.4-0.64-66.58-0.01c-10.25,0.29-13.25-3.63-12.56-12.9
			c0.6-7.98-2.49-17.62,11.5-17.12C1228.24,3.81,1245.04,3.35,1261.81,3.33z"/>
                        <path d="M0.22,60.43c0.02-15.78,0.36-31.58-0.11-47.34C-0.16,3.82,2.71-0.16,12.69,0c30.56,0.51,61.13,0.61,91.69,0.01
			c10.9-0.21,13.2,4.33,13.25,14.03c0.05,10.03-1.89,15.98-13.63,15.67c-19.71-0.52-39.44,0.17-59.15-0.27
			c-11.42-0.25-15.77,4.37-15.48,15.81c0.55,21.69-0.27,43.41,0.25,65.1c0.27,11.17-5.31,12.95-14.69,12.8
			c-8.91-0.14-15.37-0.75-14.9-12.43C0.7,93.99,0.2,77.2,0.22,60.43z"/>
                        <path d="M60.95,895.77c-15.81-0.02-31.63-0.48-47.41,0.15c-10.57,0.42-13.63-3.99-13.48-13.99c0.44-30.14,0.53-60.29-0.02-90.43
			c-0.2-11.15,5.06-13.02,14.5-13.02c9.14,0,15.37,1.09,15.07,12.5c-0.49,18.77-0.21,37.55-0.11,56.33
			c0.09,18.09,0.93,18.91,19.52,18.98c20.25,0.07,40.52,0.44,60.75-0.21c12.09-0.39,13.44,5.97,13.52,15.75
			c0.08,9.88-2.73,14.54-13.44,14.12C93.56,895.32,77.25,895.79,60.95,895.77z"/>
                        <path d="M1323.12,837.86c0.02,15.8-0.25,31.61,0.12,47.4c0.22,9.1-2.52,13.5-12.59,13.35c-30.59-0.45-61.2-0.34-91.79-0.06
			c-8.75,0.08-12.98-2.77-11.98-12.05c0.87-8.13-1.24-17.72,11.94-17.61c19.25,0.16,38.51-0.54,57.74,0.08
			c12.53,0.4,17.84-3.74,17.28-16.97c-0.86-20.21,0.36-40.5-0.39-60.72c-0.45-12.19,3.67-16.04,16.03-16.19
			c13.63-0.17,13.88,7.11,13.7,16.84C1322.9,807.25,1323.11,822.56,1323.12,837.86z"/>
                    </g>
                    <g>
                        <path d="M663.12,98.25c155.76,0,311.52-0.09,467.27,0.05c59.33,0.05,94.9,35.72,94.93,95.38c0.11,170.67,0.07,341.35-0.18,512.02
			c-0.08,57.77-36.1,93.87-93.29,93.93c-313,0.34-626,0.6-939,0.78c-44.55,0.03-75.4-19.58-89.04-57.72
			c-4.06-11.36-5.62-24.18-5.64-36.33c-0.35-171.17-0.41-342.34-0.13-513.51c0.09-58.16,36.64-94.15,94.84-94.2
			c156.75-0.13,313.5-0.04,470.24-0.04C663.12,98.48,663.12,98.36,663.12,98.25z M663.33,131.67c0,0.12,0,0.23,0,0.35
			c-157.22,0-314.43-0.07-471.65,0.05c-38.05,0.03-59.78,21.82-59.8,60c-0.11,172.13-0.12,344.26,0.02,516.39
			c0.03,36.19,22.47,58.83,57.97,58.81c313.94-0.1,627.88-0.27,941.82-0.52c37.41-0.03,60.18-22.84,60.21-60.14
			c0.12-171.14,0.14-342.28,0.08-513.42c-0.01-39.7-21.77-61.46-61.44-61.49C974.8,131.61,819.06,131.67,663.33,131.67z"/>
                        <g>
                            <path d="M1009.93,423.58c0,11.12,0,20.84,0,31.43c-232.25,0-463,0-696.2,0c0-10.12,0-20.18,0-31.43
				C545,423.58,776.39,423.58,1009.93,423.58z"/>
                            <path d="M1009.93,548.22c0,10.81,0,20.47,0,30.9c-232.7,0-463.83,0-696.61,0c0-10.52,0-20.17,0-30.9
				C545.17,548.22,776.33,548.22,1009.93,548.22z"/>
                            <path d="M526.94,298.7c0,11.18,0,20.86,0,31.49c-71.42,0-141.85,0-213.4,0c0-10.61,0-20.62,0-31.49
				C384.65,298.7,455.11,298.7,526.94,298.7z"/>
                            <path d="M913.69,330.09c-0.39-3.08-0.9-5.42-0.93-7.77c-0.11-7.37-0.04-14.74-0.04-23.28c32.6,0,64.36,0,97.21,0
				c0,9.92,0,19.93,0,31.05C977.87,330.09,946.18,330.09,913.69,330.09z"/>
                            <path d="M571.72,330.09c-1.06-3.08-2.48-5.42-2.57-7.77c-0.3-7.37-0.11-14.74-0.11-23.28c89.99,0,177.66,0,268.35,0
				c0,9.92,0,19.93,0,31.05C748.87,330.09,661.39,330.09,571.72,330.09z"/>
                        </g>
                    </g>
                </g>
            </svg>
        </Box>
    )
}

export default IdBackIcon