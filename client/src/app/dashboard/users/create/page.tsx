"use client";

import Sidebar from "@/core/layout/sidebar/index";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import CreateUserComponent from "@/modules/employees/presentation/pages";

// ----------------------------------------------------------------------

export default function CreateUser() {
  return (
    <ProtectedLayout>
      <Sidebar pageTitle={"اضـــافة مـــوظف"}>
        <CreateUserComponent />
      </Sidebar>
    </ProtectedLayout>
  );
}
