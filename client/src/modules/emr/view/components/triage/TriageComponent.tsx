import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import {
  deleteTriage,
  getTriageList,
} from "@/modules/emr/controllers/thunks/triage-thunk";
import { TriageState } from "@/modules/emr/controllers/types";
import React from "react";
import { triageHeaderTable } from "./data";
import TriageForm from "./TriageForm";

const TriageComponent = () => {
  const triagesState: TriageState = useAppSelector(
    (state: any) => state.assessments
  );
  return (
    <ExaminationAccordion
      getListThunk={getTriageList}
      deleteThunk={deleteTriage}
      tableList={triagesState?.assessments}
      tableHeader={triageHeaderTable}
      title="التشخيص المبدئي"
      FormComponent={TriageForm}
      formDialogMaxWidth="md"
    />
  );
};

export default TriageComponent;
