import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TodosContext } from "../contexts/todoContext";
import { useContext } from "react";
import { useState } from "react";
import { OpenEditModal } from "../contexts/openEditModal";

// Interfaces
interface editModalInterface {
  id: string;
}
// =========== Interfaces ===========

function EditModal({ id }: editModalInterface) {
  // Use Context
  const { todosDataState, setTodosData } = useContext(TodosContext);
  const { setIsEditModalOpen } = useContext(OpenEditModal);
  // ======== Use Context ==============

  // Vars
  // ====== Vars =======

  // Use States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // ======= Use States ==========

  // Functions
  const handleEdition = () => {
    const updatedTodos = todosDataState.map((todo) =>
      todo.id === id ? { ...todo, title, content } : todo
    );

    setTodosData(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setIsEditModalOpen(false);
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
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            borderRadius: "20px",
            width: "35%",
          }}
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
