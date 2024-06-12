import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import {
  deleteRadiology,
  getRadiologiesList,
} from "@/modules/emr/controllers/thunks/radiologies-thunk";
import { RadiologiesState } from "@/modules/emr/controllers/types";
import React from "react";
import { radiologiesHeaderTable } from "./data";
import RadiologiesForm from "./RadiologiesForm";
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";

const RadiologiesComponent = ({
  patientId,
  visitCode,
}: PatientIDsInterface) => {
  const radiologiesState: RadiologiesState = useAppSelector(
    (state: any) => state.radiologies
  );
  return (
    <ExaminationAccordion
      getListThunk={getRadiologiesList}
      deleteThunk={deleteRadiology}
      tableList={radiologiesState?.radiologies}
      tableHeader={radiologiesHeaderTable}
      title="الاشعة"
      FormComponent={RadiologiesForm}
      formDialogMaxWidth="md"
      patientId={patientId}
      visitCode={visitCode}
      isAccordionExpanded={true}
    />
  );
};

export default RadiologiesComponent;
