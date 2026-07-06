"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

interface Ichild {
  children: ReactNode;
}

const RTKprovider = ({ children }: Ichild) => {
  // here provider
  return <>{children}</>;
};

export default RTKprovider;
