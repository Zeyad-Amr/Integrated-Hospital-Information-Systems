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

const DiagnosisComponent = () => {
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
    />
  );
};

export default DiagnosisComponent;
