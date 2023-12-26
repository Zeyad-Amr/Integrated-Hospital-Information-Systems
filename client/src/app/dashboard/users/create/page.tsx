"use client";

import Sidebar from "@/core/layout/sidebar/index";
import CreateUserComponent from "@/modules/employees/presentation/pages";

// ----------------------------------------------------------------------

export default function CreateUser() {
  return (
    <div>
      <Sidebar pageTitle={'اضـــافة مـــوظف'}>
        <CreateUserComponent />
      </Sidebar>
    </div>
  );
}
