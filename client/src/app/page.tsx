"use client";

import { AppServicesLocator } from "@/core/service-locator";

import Test from "./test";
import { Provider } from "react-redux";
import store from "@/core/redux/store";
// ----------------------------------------------------------------------

export default function App() {
  AppServicesLocator.init();
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
}
