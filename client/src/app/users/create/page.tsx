"use client";

import TestPage from "@/core/shared/components/test";
import Sidebar from "@/core/layout/sidebar/index";
import CreateUserComponent from "@/modules/staff/create-user/presentation/controllers";

// ----------------------------------------------------------------------

export default function CreateUser() {
  return (
    <div>
      <Sidebar>
        <CreateUserComponent/>
      </Sidebar>
    </div>
  );
}
