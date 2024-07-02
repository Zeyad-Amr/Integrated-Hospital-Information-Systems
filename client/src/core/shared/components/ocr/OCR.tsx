import { Box, styled } from '@mui/system'
import React, { useState } from 'react'
import IdFaceIcon from './IdFaceIcon';
import { Button, Typography } from '@mui/material';
import IdBackIcon from './IdBackIcon';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AlertService from "@/core/shared/utils/alert-service";
import axios from 'axios';
import PersonInterface from '../../modules/person/domain/interfaces/person-interface';
import { FormikErrors } from 'formik';

const IconContainer = styled(Box)`
  transition: transform 0.5s;
`;

const IdFaceIconWithScanner = () => (
    <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
        <IdFaceIcon />
    </Box>
);

const IdBackIconWithScanner = () => (
    <Box sx={{ width: '30rem', height: '30rem', position: 'relative' }}>
        <IdBackIcon />
    </Box>
);

const OCR = ({ OCRStateController,setValues }: {
    OCRStateController: React.Dispatch<React.SetStateAction<boolean>>;
    setValues:(values: React.SetStateAction<PersonInterface>, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<PersonInterface>>
}) => {

    const [showFront, setShowFront] = useState(true);

    const flipId = () => {
        setShowFront(!showFront);
    };


    const OCRSuccess = () => {
        OCRStateController(false)
        AlertService.showAlert('تم استخرج البيانات بنجاح', 'success');

    }
    const OCRNeedReview = () => {
        OCRStateController(false)
        AlertService.showAlert('تم استخرج البيانات ولكن يجب مراجعتها', 'warning');

    }
    const OCRFail = () => {
        OCRStateController(false)
        AlertService.showAlert('فشل استخرج البيانات', 'error');

    }

    const handleClick = () =>{
        axios.get("http://localhost:8000/scanner/scan")
        .then((res)=>{
            console.log(res)
            if(showFront){
                flipId()
            }else{
                axios.get("http://localhost:8000/scanner/sendFiles")
                .then((res)=>{
                    console.log(res);
                    if(res.data.status === 400){
                        return OCRFail()
                    }
                    if(res.data?.name){
                        const lastName = res.data.name.lastName.split(" ")
                        setValues((prev)=>({
                            ...prev,
                            firstName:res.data.name.firstName,
                            secondName:lastName[0],
                            thirdName:lastName[1],
                            fourthName:lastName[2],
                            SSN:res.data.nationalId.nationalId
                        }))
                        OCRSuccess()
                    } else {
                        const nameErr = res.data.error.name.error
                        const nationalIdErr = res.data.error.nationalId.error
                        if(nameErr !== "" && nationalIdErr !== ""){
                            OCRFail()
                        }else {
                            const lastName = res.data.error.name.lastName.split(" ")
                        setValues((prev)=>({
                            ...prev,
                            firstName:res.data.error.name.firstName,
                            secondName:lastName[0],
                            thirdName:lastName[1],
                            fourthName:lastName[2],
                            SSN:res.data.error.nationalId.nationalId
                        }))
                            OCRNeedReview()
                        }
                    }
                })
                .catch((err)=>{
                    OCRFail()
                    console.log(err);
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            OCRFail()
        })

    }

    return (
        <>

            <Box sx={{
                position: 'fixed', top: '0vh', left: '0',
                background: "radial-gradient(circle, #0351AB99, #0351AB)",
                zIndex: '1000',
                width: '100%', height: '100vh',
            }}
                onClick={() => OCRStateController(false)} />
            <Box sx={{ position: 'fixed', top: ' 2rem', left: '2rem', zIndex: '1002' }}>
                <CloseRoundedIcon sx={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }} onClick={() => OCRStateController(false)} />
            </Box>
            <Box sx={{
                display: 'flex', zIndex: '1001',
                flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'
            }}>
                <Typography sx={{ color: "white", mb: 4, fontSize: '1.5rem' }}>
                    {showFront ? "قم بمسح الوجه الامامي" : "قم بمسح الوجه الخلفي"}
                </Typography>
                <IconContainer sx={{ transform: showFront ? 'rotateY(0deg)' : 'rotateY(180deg)' }}>
                    {showFront ? <IdFaceIconWithScanner /> : <IdBackIconWithScanner />}
                </IconContainer>
                <Box sx={{ display: 'flex', gap: 1 }}>

                    <Button onClick={handleClick} variant="contained" color="primary">
                        Scan
                    </Button>
                    {/* <Button onClick={OCRSuccess} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Sucess
                    </Button>
                    <Button onClick={OCRNeedReview} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Review
                    </Button>
                    <Button onClick={OCRFail} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Fail
                    </Button> */}
                </Box>
            </Box>
        </>

    )
}

export default OCR