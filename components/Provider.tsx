"use client";

import { store } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

const ProviderCom = ({ children }: { children: ReactNode }) => {
  const navigate = useRouter();

  const pathName = usePathname();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (pathName === "/" && user) {
      navigate.replace("/clients");
    }

    if (!user) {
      navigate.replace("/");
      console.log(true);
    }

    setTrigger(true);
  }, [navigate]);
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderCom;
