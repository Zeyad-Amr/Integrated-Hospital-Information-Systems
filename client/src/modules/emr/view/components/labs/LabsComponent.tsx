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
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";

const LabsComponent = ({ patientId, visitCode }: PatientIDsInterface) => {
  const labsState: LabsState = useAppSelector((state: any) => state.labs);
  return (
    <ExaminationAccordion
      getListThunk={getLabsList}
      deleteThunk={deleteLab}
      tableList={labsState?.labs}
      tableHeader={labsHeaderTable}
      title="التحاليل"
      FormComponent={LabsForm}
      formDialogMaxWidth="md"
      patientId={patientId}
      visitCode={visitCode}
      isAccordionExpanded={true}
    />
  );
};

export default LabsComponent;
