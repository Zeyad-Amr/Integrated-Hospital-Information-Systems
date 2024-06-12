import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import {
  deleteLab,
  getLabsList,
} from "@/modules/emr/controllers/thunks/labs-thunk";
import { LabsState } from "@/modules/emr/controllers/types";
import React from "react";
import { labsHeaderTable } from "./data";
import LabsForm from "./LabsForm";

const LabsComponent = () => {
  const labsState: LabsState = useAppSelector(
    (state: any) => state.labs
  );
  return (
    <ExaminationAccordion
      getListThunk={getLabsList}
      deleteThunk={deleteLab}
      tableList={labsState?.labs}
      tableHeader={labsHeaderTable}
      title="القياسات الحيوية"
      FormComponent={LabsForm}
      formDialogMaxWidth="md"
    />
  );
};

export default LabsComponent;
