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

const AllergiesComponent = () => {
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
    />
  );
};

export default AllergiesComponent;
