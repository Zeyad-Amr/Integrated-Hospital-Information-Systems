import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import { PrescriptionsState } from "@/modules/emr/controllers/types";
import React from "react";
import {
  deletePrescription,
  getPrescriptionsList,
} from "@/modules/emr/controllers/thunks/prescriptions-thunk";
import PrescriptionsForm from "./PrescriptionsForm";
import { prescriptionsHeaderTable } from "./data";
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";
import { Filter } from "@/core/api";

const PrescriptionsComponent = ({
  patientId,
  visitCode,
}: PatientIDsInterface) => {
  const prescriptionsState: PrescriptionsState = useAppSelector(
    (state: any) => state.prescriptions
  );
  return (
    <ExaminationAccordion
      getListThunk={getPrescriptionsList}
      deleteThunk={deletePrescription}
      tableList={prescriptionsState.prescriptions}
      tableHeader={prescriptionsHeaderTable}
      title="الروشتات"
      FormComponent={PrescriptionsForm}
      formDialogMaxWidth="md"
      patientId={patientId}
      visitCode={visitCode}
      initFilters={[
        ...(patientId ? [Filter.equals("patientId", patientId)] : []),
        ...(visitCode ? [Filter.equals("visitCode", visitCode)] : []),
      ]}
    />
  );
};

export default PrescriptionsComponent;
