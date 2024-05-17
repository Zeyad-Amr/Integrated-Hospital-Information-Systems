"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import AddVisit from "@/modules/registration/presentation/pages/visit/AddVisit";

export default function CreateDepartment() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"اضـــافة مريض"}>
        <AddVisit />
      </Sidebar>
    </ProtectedLayout>
  );
}
