"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

interface Ichild {
  children: ReactNode;
}

const RTKprovider = ({ children }: Ichild) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RTKprovider;
