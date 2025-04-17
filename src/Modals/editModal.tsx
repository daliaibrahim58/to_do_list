import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { useState } from "react";
import { OpenEditModal } from "../contexts/openEditModal";
import FieldActionEdit from "../Actions/fieldActionsEdit";
import { useEffect } from "react";
import { SnackbarContext } from "../contexts/snackbarContext";
import { useTodo } from "../contextProviders/todoReducerProvider";
import { CurrentTodo } from "../contexts/currentTodo";
// Interfaces
// =========== Interfaces ===========

function EditModal() {
  // Use Context
  const { setIsEditModalOpen } = useContext(OpenEditModal);
  const { setSnackbarMessage, setIsSnackbarOpen } = useContext(SnackbarContext);
  const { currentTodo } = useContext(CurrentTodo);
  // ======== Use Context ==============

  // Vars
  // ====== Vars =======

  // Custom Hooks
  const { todoDispatch } = useTodo();
  // ========= Custom Hooks ==========

  // Use States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showFieldAction, setShowFieldAction] = useState(false);
  // ======= Use States ==========

  // Use Effect
  useEffect(() => {
    setShowFieldAction(false);
  }, [title, content]);
  // ===== Use Effect ======

  // Functions
  const handleEdition = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      todoDispatch({
        type: "edited",
        payload: {
          currentTodo,
          title,
          content,
        },
      });
      setIsEditModalOpen(false);
      setSnackbarMessage("تم تحديث المهمة بنجاح");
      setIsSnackbarOpen(true);
    } else {
      setShowFieldAction(true);
    }
  };
  // ======== Functions ===========

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.15)", // Adds a transparent background overlay
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10000,
        }}
        onClick={() => setIsEditModalOpen(false)}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            borderRadius: "20px",
            width: "35%",
          }}
          onClick={(e) => e.stopPropagation()} // prevent click inside modal from closing
        >
          <h1>تعديل المهمة</h1>
          <TextField
            id="outlined-basic"
            label="العنوان"
            variant="standard"
            sx={{
              width: "95%",
              height: "100%",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "start",
            }}
            InputLabelProps={{
              sx: {
                textAlign: "right",
                right: "25px",
                transformOrigin: "top right",
              },
            }}
            inputProps={{
              style: { textAlign: "right" }, // Aligns input text to the right
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/*Field Action */}
          <FieldActionEdit display={showFieldAction} />
          {/*==== Field Action ======= */}
          <TextField
            id="outlined-basic"
            label="التفاصيل"
            variant="standard"
            sx={{
              width: "95%",
              height: "100%",
              display: "flex",
              justifyContent: "start",
            }}
            InputLabelProps={{
              sx: {
                textAlign: "right",
                right: "25px",
                transformOrigin: "top right",
              },
            }}
            inputProps={{
              style: { textAlign: "right" }, // Aligns input text to the right
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/*Field Action */}
          <FieldActionEdit display={showFieldAction} />
          {/*==== Field Action ======= */}
          <Button
            variant="text"
            style={{
              position: "relative",
              right: "190px",
              fontSize: "16px",
              marginTop: "23px",
            }}
            onClick={() => setIsEditModalOpen(false)}
          >
            اغلاق
          </Button>
          <Button
            variant="text"
            style={{
              position: "relative",
              right: "200px",
              fontSize: "16px",
              marginTop: "23px",
            }}
            onClick={() => handleEdition()}
          >
            تاكيد
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditModal;
