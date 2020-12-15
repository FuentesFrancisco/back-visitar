import { useContext } from "react";

import context from "./userContext";

export default function useUser() {
  const userContext = useContext(context);
  const { user, setUser } = userContext;

  return { user, setUser };
}
