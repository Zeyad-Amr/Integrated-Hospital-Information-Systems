import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { Button, } from "@mui/material";
import { DataItem, data, header } from "./data";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { HOST_API } from "@/config/settings/app-config";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { LocalStorage, LocalStorageKeys } from "@/core/shared/utils/local-storage";


const ERVisitsTable = () => {

    // useRef
    const refIdValue = useRef("");
    const refStreamedData = useRef("");

    // useState
    const [showDialog, setShawDialog] = useState("none");
    const [streamedData, setStreamedData] = useState([]);

    useEffect(() => {
        let eventSource = new EventSource(HOST_API + 'streaming/event')
        eventSource.onmessage = (ev) => {

            console.log(ev);
            console.log(ev.data);
            refStreamedData.current = ev.data;
            setStreamedData(JSON.parse(ev.data).items);


        }


    }, [])

    //* data that in the state 
    const apiData: any[] = streamedData

    let tableData: DataItem[] = []
    apiData.forEach((item) => {
        tableData.push({
            sequenceNumber: item?.sequenceNumber,
            code: item?.code,
            name: item?.companion ? (item.companion?.firstName + ' ' + item.companion?.secondName + ' ' + item.companion?.thirdName + ' ' + item.companion?.fourthName) :
                "لا يوجد",
            date: (item?.createdAt) ? (item.createdAt).split('T')[0] : undefined,
            time: new Date(item?.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            update: <Button
                color="info"
                variant="outlined"
                fullWidth
                onClick={() => {
                    refIdValue.current = item.code
                    setShawDialog("block");
                }}
            >استكمال بيانات</Button>
        })
    })

    return (
        <Box
            sx={{
                p: 3
            }}
        >
            <CustomDataTable
                data={tableData}
                renderItem={header}
                stickyHeader={true}
                boxShadow={5}
            />

        </Box>
    );
};

export default ERVisitsTable;
