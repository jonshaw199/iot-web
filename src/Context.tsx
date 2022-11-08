import React from "react";

import { GlobalContext as GlobalContextType } from "./types";

export const GlobalContext = React.createContext<GlobalContextType>({
  messages: [],
  users: [],
});
