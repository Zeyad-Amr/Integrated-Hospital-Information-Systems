import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { Button } from "@mui/material";
import { AnonymizedVisit, header } from "./data";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { VisitsState } from "../../../controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { getAnonymousVisits } from "../../../controllers/thunks/visits-thunks";
import { FilterQuery } from "@/core/api";
import CompleteVisit from "../complete-visit-data/CompleteVisit";

const VisitsTable = () => {
  const state: VisitsState = useAppSelector((state: any) => state.visits);
  const dispatch = useAppDispatch();

  // useRef
  const refAnonymousPatientData = useRef<VisitInterface>();

  // useState
  const [showCompletePatientDialog, setShowCompletePatientDialog] =
    useState<boolean>(false);

  //* data that in the state
  const apiData: VisitInterface[] = state.visits.items;
  console.log("apiDataaaa", apiData);

  let tableData: AnonymizedVisit[] = [];
  apiData.forEach((item: VisitInterface) => {
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
            refAnonymousPatientData.current = item ?? "";
            setShowCompletePatientDialog(true);
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
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getAnonymousVisits(filters));
        }}
        initSortedColumn={{ columnId: "createdAt", isAscending: false }}
        totalItems={state.visits.total}
        data={tableData}
        headerItems={header}
      />
      {refAnonymousPatientData.current && (
        <CompleteVisit
          setShowCompletePatientDialog={setShowCompletePatientDialog}
          showCompletePatientDialog={showCompletePatientDialog}
          anonymousPatientData={refAnonymousPatientData.current}
        />
      )}
    </Box>
  );
};

export default VisitsTable;
