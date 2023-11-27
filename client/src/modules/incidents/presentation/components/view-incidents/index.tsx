import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { Box, Button, } from "@mui/material";
import { DataItem, IncidentType, data, header } from "./data";

const IncidentTable = () => {
    //* data that in the state 
    const apiData: any[] = data
    let tableData: DataItem[] = []
    apiData.forEach((item) => {
        tableData.push({
            numberOfPatients: item.numberOfPatients,
            uncompletedPatients: item.numberOfIncompletedVisits,
            type: IncidentType[item.type as keyof typeof IncidentType],
            date: (item.createdAt).split('T')[0],
            time: new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            update:
                <Button
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
        <Box p={3}>
            <CustomDataTable
                data={tableData}
                renderItem={header}
                stickyHeader={true}
                boxShadow={5}
            />
        </Box>
    );
};

export default IncidentTable;
