import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { Button } from "@mui/material";
import { DataItem, data, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";

const VisitsTable = () => {
  // useRef
  const refIdValue = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState("none");

  //* data that in the state
  const apiData: any[] = data;
  let tableData: DataItem[] = [];
  apiData.forEach((item) => {
    tableData.push({
      sequenceNumber: item?.sequenceNumber,
      code: item?.code,
      name: item?.companion
        ? item.companion?.firstName +
          " " +
          item.companion?.secondName +
          " " +
          item.companion?.thirdName +
          " " +
          item.companion?.fourthName
        : "لا يوجد",
      date: item?.createdAt ? item.createdAt.split("T")[0] : undefined,
      time: new Date(item?.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      update: (
        <Button
          color="info"
          variant="outlined"
          fullWidth
          onClick={() => {
            refIdValue.current = item.code;
            setShawDialog("block");
          }}
        >
          استكمال بيانات
        </Button>
      ),
    });
  });

  return (
    <Box
      sx={{
        pt: 3,
      }}
    >
      <CustomDataTable
        data={tableData}
        headerItems={header}
        stickyHeader={true}
        boxShadow={5}
        width="100%"
        height="80vh"
        sx={{ mb: 5 }}
        onRowClick={(item) => console.log(item)}
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
