import RadiologiesComponent from "@/modules/emr/view/components/radiologies/RadiologiesComponent";
import { VisitsState } from "@/modules/registration/presentation/controllers/types";
import React from "react";

interface RadiologyPagePropsInterface {
  visitState: VisitsState;
}

const RadiologyPage = ({ visitState }: RadiologyPagePropsInterface) => {
  return (
    <>
      {visitState?.currentVisit?.patientId &&
        visitState?.currentVisit?.code && (
          <RadiologiesComponent
            patientId={visitState?.currentVisit?.patientId}
            visitCode={visitState?.currentVisit?.code}
          />
        )}
    </>
  );
};

export default RadiologyPage;
