import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { Button, } from "@mui/material";
import { DataItem, data, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { HOST_API } from "@/config/settings/app-config";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { LocalStorage, LocalStorageKeys } from "@/core/shared/utils/local-storage";

const VisitsTable = () => {

    // useRef
    const refIdValue = useRef("");
    const refStreamedData = useRef("");

    // useState
    const [showDialog, setShawDialog] = useState("none");
    const [streamedData, setStreamedData] = useState("");

    useEffect(() => {
        fetchEventSource(HOST_API + 'streaming/event', {
            onmessage(ev) {
                refStreamedData.current = ev.data;
                console.log(ev.data);
                setStreamedData(ev.data);
            },
            headers: {
                "Authorization": "Bearer " + LocalStorage.fetch<string>(LocalStorageKeys.token)
            },
        })


    }, [])

    const onClickR = () => {
        console.log(JSON.parse(refStreamedData.current));
        console.log(typeof JSON.parse(refStreamedData.current));
    }

    //* data that in the state 
    const apiData: any[] = JSON.parse(streamedData ? streamedData : "[]")
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
            <Button onClick={onClickR}> fullWidth
                Test
            </Button>
            <CustomDataTable
                data={tableData}
                renderItem={header}
                stickyHeader={true}
                boxShadow={5}
            />
            <CompleteVisit
                display={showDialog}
                DialogStateController={setShawDialog}
                id={refIdValue.current}
            />

        </Box>
    );
};

export default VisitsTable;
