import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import { DiagnosisState } from "@/modules/emr/controllers/types";
import React from "react";
import { diagnosisHeaderTable } from "./data";
import {
  deleteDiagnosis,
  getDiagnosesList,
} from "@/modules/emr/controllers/thunks/diagnosis-thunk";
import DiagnosisForm from "./DiagnosisForm";
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";

const DiagnosisComponent = ({ patientId , visitCode } : PatientIDsInterface) => {
  console.log(patientId,'patientIdiiiiiiiiiiiiiiiiiii');
  console.log(visitCode,'visitCodeeeeeeeeeeeeeeeeeeeeeeeee');
  const diagnosisState: DiagnosisState = useAppSelector(
    (state: any) => state.diagnosis
  );
  return (
    <ExaminationAccordion
      getListThunk={getDiagnosesList}
      deleteThunk={deleteDiagnosis}
      tableList={diagnosisState.diagnosesList}
      tableHeader={diagnosisHeaderTable}
      title="التشخيصات"
      FormComponent={DiagnosisForm}
      patientId={patientId}
      visitCode={visitCode}
    />
  );
};

export default DiagnosisComponent;
