import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { Button, } from "@mui/material";
import { DataItem, data, header } from "./data";

const IncidentTable = () => {
    //* data that in the state 
    const apiData: any[] = data
    let tableData: DataItem[] = []
    apiData.forEach((item) => {
        tableData.push({
            sequenceNumber: item.sequenceNumber,
            code: item.code,
            name: item.patient.firstName + ' ' + item.patient.secondName + ' ' + item.patient.thirdName + ' ' + item.patient.fourthName,
            date: (item.createdAt).split('T')[0],
            time: new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            update: <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => (
                    //* 
                    console.log(item.code)
                )}
            >استكمال بيانات</Button>
        })
    })

    return (

        <CustomDataTable
            data={tableData}
            renderItem={header}
            stickyHeader={true}
            boxShadow={5}
        />
    );
};

export default IncidentTable;
