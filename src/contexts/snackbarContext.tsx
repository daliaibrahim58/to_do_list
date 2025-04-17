import { createContext } from "react";

interface snackbarContextInterface {
  isSnackbarOpen: boolean;
  setIsSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarMessage: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
}
export const SnackbarContext = createContext<snackbarContextInterface>({
  isSnackbarOpen: false,
  setIsSnackbarOpen: () => {},
  snackbarMessage: "",
  setSnackbarMessage: () => {},
});
