import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { Box, Button } from "@mui/material";
import { DataItem, IncidentType, data, header } from "./data";
import { useRef } from "react";
import { FilterQuery } from "@/core/api";

const IncidentTable = () => {
  // useRef
  const refIdValue = useRef("");

  // useState
  // const [showDialog, setShawDialog] = useState("none");

  //* data that in the state
  const apiData: any[] = data;
  let tableData: DataItem[] = [];
  apiData.forEach((item) => {
    tableData.push({
      numberOfPatients: item.numberOfPatients,
      uncompletedPatients: item.numberOfIncompletedVisits,
      type: IncidentType[item.type as keyof typeof IncidentType],
      date: item.createdAt.split("T")[0],
      time: new Date(item.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      update: (
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {
            refIdValue.current = item.id;
            // setShawDialog("block");
          }}
        >
          استكمال بيانات
        </Button>
      ),
    });
  });

  return (
    <Box pt={3}>
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
        }}
        totalItems={apiData.length}
        data={tableData}
        headerItems={header}
      />

      {/* <CompleteIncident
        display={showDialog}
        DialogStateController={setShawDialog}
        id={refIdValue.current}
      /> */}
    </Box>
  );
};

export default IncidentTable;
