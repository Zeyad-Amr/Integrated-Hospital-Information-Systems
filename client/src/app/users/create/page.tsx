"use client";

import Sidebar from "@/core/layout/sidebar/index";
import CreateUserForm from "@/modules/staff/create-user/presentation/components/user-form/form";


// ----------------------------------------------------------------------

export default function CreateUser() {
  return (
    <div>
      <Sidebar>
        <CreateUserForm />
      </Sidebar>
    </div>
  );
}
