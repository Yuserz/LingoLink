import { createContext } from "react";

// Shared state for the home screen: which pane is open (messaging / video
// call) and which contact is selected. The provider lives in pages/Home.
export const MyDataContext = createContext();
