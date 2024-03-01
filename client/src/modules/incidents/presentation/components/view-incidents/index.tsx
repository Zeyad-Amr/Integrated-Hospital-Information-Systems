import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { Box, Button } from "@mui/material";
import { DataItem, IncidentType, data, header } from "./data";
import CompleteIncident from "../../pages/CompleteIncident";
import { useRef, useState } from "react";

const IncidentTable = () => {
  // useRef
  const refIdValue = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState("none");

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
            setShawDialog("block");
          }}
        >
          استكمال بيانات
        </Button>
      ),
    });
  });

  return (
    <Box p={3}>
      <CustomDataTable
        data={tableData}
        headerItems={header}
        stickyHeader={true}
        boxShadow={5}
      />

      <CompleteIncident
        display={showDialog}
        DialogStateController={setShawDialog}
        id={refIdValue.current}
      />
    </Box>
  );
};

export default IncidentTable;
