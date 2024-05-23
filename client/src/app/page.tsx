"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
// import { AppServicesLocator } from "@/core/service-locator";

import Test from "@/core/shared/components/test";

// ----------------------------------------------------------------------

export default function App() {
  // AppServicesLocator.init();
  return (
    <ProtectedLayout>
      <Test />;
    </ProtectedLayout>
  );
}
