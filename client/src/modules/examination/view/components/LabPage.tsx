import LabsComponent from "@/modules/emr/view/components/labs/LabsComponent";
import { VisitsState } from "@/modules/registration/presentation/controllers/types";
import React from "react";

interface LabPagePropsInterface {
  visitState: VisitsState;
}

const LabPage = ({ visitState }: LabPagePropsInterface) => {
  return (
    <>
      {visitState?.currentVisit?.patientId &&
        visitState?.currentVisit?.code && (
          <LabsComponent
            patientId={visitState?.currentVisit?.patientId}
            visitCode={visitState?.currentVisit?.code}
          />
        )}
    </>
  );
};

export default LabPage;
