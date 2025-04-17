import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbarContext";

// Interfaces
interface SnackbarProps {
  content: string;
}
// ====== Interfaces

export default function SimpleSnackbar({ content }: SnackbarProps) {
  
// Use Context
const {isSnackbarOpen, setIsSnackbarOpen} = useContext(SnackbarContext);
// ======= Use Context

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div style={{ direction: "rtl" }}>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleClose}
        autoHideDuration={6000}
        message={content}
        action={action}
        ContentProps={{
          style: {
            display: "flex",
            flexDirection: "row-reverse",
          },
        }}
      />
    </div>
  );
}
