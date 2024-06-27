import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";
import {
  deleteAllergy,
  getAllergiesList,
} from "@/modules/emr/controllers/thunks/allergies-thunk";
import { AllergiesState } from "@/modules/emr/controllers/types";
import React from "react";
import { allergiesHeaderTable } from "./data";
import AllergiesForm from "./AllergiesForm";
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";
import { Filter } from "@/core/api";

const AllergiesComponent = ({ patientId }: PatientIDsInterface) => {
  const allergiesState: AllergiesState = useAppSelector(
    (state: any) => state.allergies
  );
  return (
    <ExaminationAccordion
      getListThunk={getAllergiesList}
      deleteThunk={deleteAllergy}
      tableList={allergiesState.allergies}
      tableHeader={allergiesHeaderTable}
      title="الحساسية"
      FormComponent={AllergiesForm}
      formDialogMaxWidth="md"
      patientId={patientId}
      initFilters={[
        ...(patientId ? [Filter.equals("patientId", patientId)] : []),
      ]}
    />
  );
};

export default AllergiesComponent;
