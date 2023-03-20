import React, { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import NavBar from "./navbar";

import type { UserType } from "../lib/types";
import { getUser } from "../lib/apiClient";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userReq = async () => {
      const user = await getUser();
      console.log(user);
      setUser(user);
    };

    userReq();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <div className="drawer drawer-mobile">{children}</div>
    </UserContext.Provider>
  );
}
