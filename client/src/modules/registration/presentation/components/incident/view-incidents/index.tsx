import CustomDataTable from "@/core/shared/components/CustomDataTable/CustomDataTable";
import { Box, Button } from "@mui/material";
import { IncidentVisit, header } from "./data";
import { useRef, useState } from "react";
import { FilterQuery } from "@/core/api";
import { IncidentsState } from "../../../controllers/types";
import { useAppDispatch, useAppSelector } from "@/core/state/store";
import { getAllIncidents } from "../../../controllers/thunks/incident-thunk";
import IncidentInterface from "@/modules/registration/domain/interfaces/incident-interface";
import CompleteIncident from "../../../pages/incident/CompleteIncident";
import { LookupsState } from "@/core/shared/modules/lookups/presentation/controllers/types";
import { CameFromOptionsInterface } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";

const IncidentTable = () => {
  const state: IncidentsState = useAppSelector((state: any) => state.incidents);
  const lookupsState: LookupsState = useAppSelector(
    (state: any) => state.lookups
  );
  const dispatch = useAppDispatch();

  // useRef
  const refIncidentValue = useRef<IncidentInterface>();

  // useState
  const [showCompleteIncidentDialog, setShowCompleteIncidentDialog] =
    useState<boolean>(false);

  //* data that in the state
  let tableData: IncidentVisit[] = [];
console.log(state.incidents.items);

  state.incidents.items.forEach((item: IncidentInterface) => {
    console.log(item?.numOfPatients );
    
    tableData.push({
      comeFrom:
        lookupsState?.lookups?.cameFromOptions?.find(
          (el: CameFromOptionsInterface) =>
            el.id === (item.additionalInfo?.comeFrom ?? "")
        )?.value ?? "لا يوجد",

      injuryLocation: item?.additionalInfo?.place ?? "لا يوجد",
      injuryCause: item?.additionalInfo?.reason ?? "لا يوجد",
      numberOfIncompletedVisits: item?.numberOfIncompletedVisits ?? "لا يوجد",
      numOfPatients : item?.numOfPatients  ?? "لا يوجد",
      createdAt: item?.createdAt
        ? new Date(item?.createdAt).toLocaleDateString() +
          " " +
          new Date(item?.createdAt).toLocaleTimeString()
        : "لا يوجد",

      update: (
        <Button
          color="info"
          variant="outlined"
          fullWidth
          onClick={() => {
            refIncidentValue.current = item ?? "";
            setShowCompleteIncidentDialog(true);
            console.log(item);
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
        resetComponent={state.incidents.reset}
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
          dispatch(getAllIncidents(filters));
        }}
        initSortedColumn={{ columnId: "createdAt", isAscending: false }}
        totalItems={state.incidents.total}
        data={tableData}
        headerItems={header}
        onRowClick={(row) => {
          console.log(row);
        }}
      />
      {refIncidentValue.current && (
        <CompleteIncident
          incidentData={refIncidentValue.current}
          isOpenDialog={showCompleteIncidentDialog}
          setIsOpenDialog={setShowCompleteIncidentDialog}
        />
      )}
    </Box>
  );
};

export default IncidentTable;
