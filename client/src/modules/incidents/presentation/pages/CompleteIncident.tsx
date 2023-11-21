import Dialog from '@/core/shared/components/Dialog'
import PersonalData from '@/core/shared/components/PersonalData'
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton'
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

const CompleteIncident = (props:any) => {

    const [patients, setPatients] = useState(
    [
        {
            id:'1',
            name:'احمد طلعت',
            status:'completed',
        },
        {
            id:'2',
            name:'مريض جديد',
            status:'empty',
        },
        {
            id:'3',
            name:'نور فؤاد',
            status:'notCompleted',
        },
        {
            id:'4',
            name:'مريض جديد',
            status:'empty',
        },
        {
            id:'5',
            name:'احمد مروان',
            status:'completed',
        },
        {
            id:'6',
            name:'مريض جديد',
            status:'empty',
        },
        {
            id:'7',
            name:'هاني نسيم',
            status:'notCompleted',
        },
    ])

    const [selectedId, setSelectedId] = useState('')

    const arraySort = (array: {id:string, name:string, status:string}[]) => {
        let emptyArray : {id:string, name:string, status:string}[] = []
        let NCArray : {id:string, name:string, status:string}[] = []
        let CArray : {id:string, name:string, status:string}[] = []
        
        let sortedArray : {id:string, name:string, status:string}[] = []

        for(let i = 0; i < array.length; i++) {
            if(array[i].status === 'empty') {
                emptyArray.push(array[i])
            } else if(array[i].status === 'notCompleted'){
                NCArray.push(array[i])
            } else {
                CArray.push(array[i])
            }
        }
        sortedArray = emptyArray.concat(NCArray, CArray)
        return sortedArray
    }


  return (
    <Dialog display={props.display} DialogStateController={props.DialogStateController} title='استكمال بيانات الحادث'>
        <Box sx={{
            backgroundColor:'primary.darker',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'.5rem 2rem',
            }}>
            <Grid container sx={{color:'white', padding:'0.5rem', alignItems:'center'}}>
            <Grid item lg={3} md={3} sm={6} xs={12} sx={{display:'flex', justifyContent:'center'}}>
                <Typography>عدد المرضى :</Typography><Typography sx={{fontWeight:'600'}}>&nbsp;{patients.length}</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12} sx={{display:'flex', justifyContent:'center'}}>
                <Typography>قادم من :</Typography><Typography sx={{fontWeight:'600'}}>&nbsp;حادث</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12} sx={{display:'flex', justifyContent:'center'}}>
                <Typography>المسعف :</Typography><Typography sx={{fontWeight:'600'}}>&nbsp;محمد ابراهيم</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12} sx={{display:'flex', justifyContent:'center'}}>
                <Typography>سيارة الاسعاف :</Typography><Typography sx={{fontWeight:'600'}}>&nbsp;س و م 23</Typography>
            </Grid>
            </Grid>
        </Box>
        <Box sx={{display:'flex', width:'100%', height:'80%', padding:'1rem'}}>
            <Box sx={{backgroundColor:'#eee', width:'25%', height:'100%',borderRadius:'15px', padding:'1rem', overflow:'auto'}}>
                {arraySort(patients).map((patient)=>(
                    <Box
                    key={patient.id} id={patient.id}
                    sx={{display:'flex', padding:'1rem 2rem', alignItems:'center', justifyContent:'flex-start',transition:'0.2s ease-in-out', backgroundColor:patient.id === selectedId ? 'primary.main' :'#dddddd99', color:patient.id === selectedId ? 'white' :'black', borderRadius:'15px', marginBottom:'1rem', cursor:'pointer'}}
                    onClick={(e) => setSelectedId(e.target.id)}
                    >
                        <Box sx={{
                            pointerEvents:'none',
                            borderRadius:'50%',
                            width:'1rem',
                            height:'1rem',
                            backgroundColor: patient.status === 'completed' ? 'success.main' : (patient.status === 'notCompleted' ? 'warning.main' : 'error.main'),
                            marginRight:'1rem'
                            }}></Box>
                        <Typography sx={{pointerEvents:'none'}}>{patient.name}</Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{width:'75%', overflow:'scroll', padding:'2rem'}}>
            <PersonalData initialValues={
            {firstName: '',
            secondName: '',
            thirdName: '',
            forthName: '',
            email: '',
            SSN: '',
            phone: '',
            id: '',
            gender: '',
            governate: '',
            date: '',
            address: '',
            SSNtype: '',
            search: '',}
            }

            onSubmit={() => (console.log('goooo')) } isSubmitted={true} 
            />
            <PrimaryButton title='حفــظ'/>
            </Box>
        </Box>
    </Dialog>
  )
}

export default CompleteIncident