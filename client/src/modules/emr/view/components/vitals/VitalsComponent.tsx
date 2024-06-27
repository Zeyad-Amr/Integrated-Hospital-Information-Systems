import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import {
  deleteVital,
  getVitalsList,
} from "@/modules/emr/controllers/thunks/vitals-thunk";
import { VitalsState } from "@/modules/emr/controllers/types";
import React from "react";
import { vitalsHeaderTable } from "./data";
import VitalsForm from "./VitalsForm";
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";

const VitalsComponent = ({patientId , visitCode} : PatientIDsInterface) => {
  const vitalsState: VitalsState = useAppSelector(
    (state: any) => state.vitals
  );
  return (
    <ExaminationAccordion
      getListThunk={getVitalsList}
      deleteThunk={deleteVital}
      tableList={vitalsState?.vitals}
      tableHeader={vitalsHeaderTable}
      title="القياسات الحيوية"
      FormComponent={VitalsForm}
      formDialogMaxWidth="md"
      patientId={patientId}
      visitCode={visitCode}
      isVitalsRequired={true}
    />
  );
};

export default VitalsComponent;
