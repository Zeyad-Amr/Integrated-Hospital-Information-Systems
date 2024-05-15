import React, { useState } from 'react'
import { Box } from '@mui/system'
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton'
import PopUp from '@/core/shared/components/PopUp'
import SubDepartmentsForm from '../../components/subdepartments/SubDepartmentsForm'
import SubDepartmentsTable from '../../components/subdepartments/SubDepartmentsTable'


const SubDepartments = () => {
    const [showDialog, setShawDialog] = useState("none");

    return (
        <Box
            sx={{
                width: "90%",
                height: "70vh",
                margin: "0 auto 0",
            }}
        >
            {/* <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة قســم فــرعي">
                <SubDepartmentsForm />
            </PopUp> */}
            <SubDepartmentsTable />
        </Box>
    )
}

export default SubDepartments