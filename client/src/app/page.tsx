"use client";

import { AppServicesLocator } from "@/core/service-locator";

import Test from "./test";

// ----------------------------------------------------------------------

export default function App() {
  AppServicesLocator.init();
  return <Test />;
}
