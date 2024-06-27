import ExaminationAccordion from "@/core/shared/components/ExaminationAccordion";
import { useAppSelector } from "@/core/state/store";

import { SurgeriesState } from "@/modules/emr/controllers/types";
import React from "react";
import { surgeriesHeaderTable } from "./data";
import {
  deleteSurgery,
  getSurgeriesList,
} from "@/modules/emr/controllers/thunks/surgeries-thunk";
import SurgeriesForm from "./SurgeriesForm";
import { PatientIDsInterface } from "@/modules/emr/interfaces/patientIds-interface";
import { Filter } from "@/core/api";

const SurgeriesComponent = ({ patientId, visitCode }: PatientIDsInterface) => {
  const surgeriesState: SurgeriesState = useAppSelector(
    (state: any) => state.surgeries
  );
  return (
    <ExaminationAccordion
      getListThunk={getSurgeriesList}
      deleteThunk={deleteSurgery}
      tableList={surgeriesState.surgeries}
      tableHeader={surgeriesHeaderTable}
      title="الجراحة"
      FormComponent={SurgeriesForm}
      patientId={patientId}
      visitCode={visitCode}
      initFilters={[
        ...(patientId ? [Filter.equals("patientId", patientId)] : []),
      ]}
    />
  );
};

export default SurgeriesComponent;
