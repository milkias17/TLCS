import { createContext } from "react";
import type { UserType } from "@lib/types";


type ContextUser = {
  user: UserType | null;
  setUser: (val: UserType | null) => void;
};

const UserContext = createContext<ContextUser>({
  user: null,
  setUser: () => {},
});
export default UserContext;
