import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { Button, } from "@mui/material";
import { DataItem, data, header } from "./data";
import { Box } from "@mui/system";

const VisitsTable = () => {
    //* data that in the state 
    const apiData: any[] = data
    let tableData: DataItem[] = []
    apiData.forEach((item) => {
        tableData.push({
            sequenceNumber: item.sequenceNumber,
            code: item.code,
            name: item.companion ? (item.companion?.firstName + ' ' + item.companion?.secondName + ' ' + item.companion?.thirdName + ' ' + item.companion?.fourthName) :
                "لا يوجد",
            date: (item.createdAt).split('T')[0],
            time: new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            update: <Button
                color="info"
                variant="outlined"
                fullWidth
                onClick={() => (console.log(item.code))}
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

export default VisitsTable;
