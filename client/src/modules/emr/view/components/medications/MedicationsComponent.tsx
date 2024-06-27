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
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";
import { Filter } from "@/core/api";

const MedicationsComponent = ({ patientId }: PatientIDsInterface) => {
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
      patientId={patientId}
      initFilters={[
        ...(patientId ? [Filter.equals("patientId", patientId)] : []),
      ]}
    />
  );
};

export default MedicationsComponent;
