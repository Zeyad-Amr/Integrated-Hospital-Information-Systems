import { Button, } from "@mui/material";
import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { HOST_API } from "@/config/settings/app-config";
import CustomBasicTable from "@/core/shared/components/CustomBasicTable";
import ErAreaForm from "../er-area-form/ErAreaForm";


const ERVisitsTable = () => {

    // useRef
    const refIdValue = useRef("");

    // useState
    const [showDialog, setShawDialog] = useState(false);
    const [streamedData, setStreamedData] = useState([]);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        let eventSource = new EventSource(HOST_API + 'streaming/event')
        eventSource.onmessage = (ev) => {
            // console.log(ev.data);
            // refStreamedData.current = JSON.parse(ev.data).items;
            var test = JSON.parse(ev.data).items
            setStreamedData(test);
            // console.log(JSON.parse(ev.data).items);
            // console.log(streamedData);
            // console.log(refStreamedData);
        }


    }, [])

    //* data that in the state 

    // Update tableData when streamedData changes
    useEffect(() => {
        let apiData: any[] = streamedData
        let newTableData: DataItem[] = [];
        apiData.forEach((item) => {
            newTableData.push({
                sequenceNumber: item?.sequenceNumber,
                code: item?.code,
                name: item?.patient?.person ? (item.patient?.person?.firstName + ' ' + item.patient?.person?.secondName + ' ' + item.patient?.person?.thirdName + ' ' + item.patient?.person?.fourthName) :
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
                        setShawDialog(true);
                    }}
                >استكمال بيانات</Button>
            })
        });

        setTableData(newTableData);
    }, [streamedData]);

    return (
        <Box
            sx={{
                p: 3
            }}
        >
            <CustomBasicTable
                data={tableData}
                renderItem={header}
                stickyHeader={true}
                boxShadow={5}
            />
            <ErAreaForm openDialog={showDialog} setOpenDialog={setShawDialog} visitCode={refIdValue.current} />

        </Box>
    );
};

export default ERVisitsTable;
