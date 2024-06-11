import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import { MedicationsState } from "@/modules/emr/controllers/types";
import React from "react";
import { medicationsHeaderTable } from "./data";
import {
  deleteMedication,
  getMedicationsList,
} from "@/modules/emr/controllers/thunks/medications-thunk";
import MedicationsForm from "./MedicationsForm";

const MedicationsComponent = () => {
  const medicationsState: MedicationsState = useAppSelector(
    (state: any) => state.medications
  );
  return (
    <ExaminationAccordion
      getListThunk={getMedicationsList}
      deleteThunk={deleteMedication}
      tableList={medicationsState.medications}
      tableHeader={medicationsHeaderTable}
      title="الأدوية"
      FormComponent={MedicationsForm}
      formDialogMaxWidth="md"
    />
  );
};

export default MedicationsComponent;
