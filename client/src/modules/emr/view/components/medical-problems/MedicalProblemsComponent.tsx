import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import { MedicalProblemsState } from "@/modules/emr/controllers/types";
import React from "react";
import { medicalProblemsHeaderTable } from "./data";
import {
  deleteMedicalProblem,
  getMedicalProblemsList,
} from "@/modules/emr/controllers/thunks/medical-problems-thunk";
import MedicalProblemsForm from "./MedicalProblemsForm";

const MedicalProblemsComponent = () => {
  const medicalProblemsState: MedicalProblemsState = useAppSelector(
    (state: any) => state.medicalProblems
  );
  return (
    <ExaminationAccordion
      getListThunk={getMedicalProblemsList}
      deleteThunk={deleteMedicalProblem}
      tableList={medicalProblemsState.medicalProblems}
      tableHeader={medicalProblemsHeaderTable}
      title="المشاكل الطبية"
      FormComponent={MedicalProblemsForm}
      formDialogMaxWidth="md"
    />
  );
};

export default MedicalProblemsComponent;
