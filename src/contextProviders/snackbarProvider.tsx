import { SnackbarContext } from "../contexts/snackbarContext";
import { useState } from "react";
import { ReactNode } from "react";

type SnackbarProviderProps = {
  children: ReactNode;
};

function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  return (
    <SnackbarContext.Provider
      value={{
        isSnackbarOpen,
        setIsSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
