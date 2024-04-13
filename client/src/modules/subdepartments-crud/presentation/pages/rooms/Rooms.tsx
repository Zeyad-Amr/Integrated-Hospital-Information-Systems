import React, { useState } from 'react'
import { Box } from '@mui/system'
import RoomsTable from '../../components/rooms/RoomsTable'
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton'
import PopUp from '@/core/shared/components/PopUp'
import RoomsForm from '../../components/rooms/RoomsForm'

const Rooms = () => {
    const [showDialog, setShawDialog] = useState("none");

    return (
        <Box
            sx={{
                width: "90%",
                height: "70vh",
                margin: "0 auto 0",
            }}
        >
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة غــرقة"
            >
                <RoomsForm />
            </PopUp>
            <PrimaryButton type='button' title='اضــافة غــرفة' sx={{ marginBottom: "1rem" }} onClick={() => setShawDialog("block")}/>
            <RoomsTable />
        </Box>
    )
}

export default Rooms