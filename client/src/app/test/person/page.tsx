"use client";

import Sidebar from "@/core/layout/sidebar";
import ErAreaPage from "@/modules/er-area/presentation/pages";

export default function Dashboard() {
  return (
    <Sidebar>
      <ErAreaPage />
    </Sidebar>
  );
}
