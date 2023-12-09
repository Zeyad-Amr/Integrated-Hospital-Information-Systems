import CustomDataTable from "@/core/shared/components/CustomDataTable";
import { DataItem, data, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../../../../visits/presentation/components/complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";

const EmployeesTable = () => {

    // useRef
    const refIdValue = useRef("");

    // useState
    const [showDialog, setShawDialog] = useState("none");

    //* data that in the state 
    const apiData: any[] = data
    let tableData: DataItem[] = []
    apiData.forEach((item) => {
        tableData.push({
            SSN: item.person.SSN,
            email: item.person.email,
            phone: item.person.phone,
            role: item.role.toLowerCase(),
            name: item.person?.firstName + ' ' + item.person?.secondName + ' ' + item.person?.thirdName + ' ' + item.person?.fourthName,
            // date: (item.createdAt).split('T')[0],
            // time: new Date(item.createdAt).toLocaleTimeString([], {
            //     hour: '2-digit',
            //     minute: '2-digit',
            //     second: '2-digit'
            // }),
            // update: <Button
            //     color="info"
            //     variant="outlined"
            //     fullWidth
            //     onClick={() => {
            //         refIdValue.current = item.code
            //         setShawDialog("block");
            //     }}
            // >استكمال بيانات</Button>
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
            <CompleteVisit
                display={showDialog}
                DialogStateController={setShawDialog}
                id={refIdValue.current}
            />
        </Box>
    );
};

export default EmployeesTable;
