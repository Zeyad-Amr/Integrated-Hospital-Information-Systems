import React, { useState } from 'react'
import { Box } from '@mui/system'
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton'
import PopUp from '@/core/shared/components/PopUp'
import SpecializationsForm from '../../components/specializations/SpecializationsForm'
import SpecializationsTable from '../../components/specializations/SpecializationsTable'

const Specializations = () => {
    const [showDialog, setShawDialog] = useState("none");

    return (
        <Box
            sx={{
                width: "90%",
                height: "70vh",
                margin: "0 auto 0",
            }}
        >
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة تخصص"
            >
                <SpecializationsForm />
            </PopUp>
            <PrimaryButton type='button' title='اضــافة تخصص' sx={{ marginBottom: "1rem" }} onClick={() => setShawDialog("block")}/>
            <SpecializationsTable />
        </Box>
    )
}

export default Specializations