import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { Button } from "@mui/material";
import { AnonymizedVisit, header } from "./data";
import { Box } from "@mui/system";
import CompleteVisit from "../complete-visit-data/CompleteVisit";
import { useRef, useState } from "react";
import { VisitsState } from "../../../controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { getAnonymousVisits } from "../../../controllers/thunks/visits-thunks";
import { FilterQuery } from "@/core/api";

const VisitsTable = () => {
  const state: VisitsState = useAppSelector((state: any) => state.visits);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getAnonymousVisits([]));
  // }, []);

  // useRef
  const refIdValue = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState("none");

  //* data that in the state
  const apiData: VisitInterface[] = state.visits;
  console.log("apiDataaaa", apiData);

  let tableData: AnonymizedVisit[] = [];
  apiData.forEach((item) => {
    tableData.push({
      sequenceNumber: item?.sequenceNumber ?? "",
      code: item?.code ?? "",
      companionName: item?.companion
        ? item.companion?.firstName +
          " " +
          item.companion?.secondName +
          " " +
          item.companion?.thirdName +
          " " +
          item.companion?.fourthName
        : "لا يوجد",
      companionSSN: item?.companion?.SSN ?? "لا يوجد",
      createdAt: item?.createdAt
        ? new Date(item?.createdAt).toLocaleDateString() +
          " " +
          new Date(item?.createdAt).toLocaleTimeString()
        : "",

      update: (
        <Button
          color="info"
          variant="outlined"
          fullWidth
          onClick={() => {
            refIdValue.current = item.code ?? "";
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
        applyFilters={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getAnonymousVisits(filters));
        }}
        initSortedColumn={{ columnId: "createdAt", isAscending: false }}
        totalItems={state.total}
        data={tableData}
        headerItems={header}
        stickyHeader={true}
        boxShadow={5}
        width="100%"
        height="80vh"
        sx={{ mb: 5 }}
        onRowClick={(item: any) => console.log(item)}
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
