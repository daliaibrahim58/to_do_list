import Button from "@mui/material/Button";
import { useContext } from "react";
import { openDeletedModal } from "../contexts/openDeletedModal";
import { CurrentTodo } from "../contexts/currentTodo";
import { SnackbarContext } from "../contexts/snackbarContext";
import { useTodo } from "../contextProviders/todoReducerProvider";

function DeleteModal() {
  // Use States

  // =========== Use States =============

  // Use Context
  const { setIsModalOpen } = useContext(openDeletedModal);
  const { currentTodo } = useContext(CurrentTodo);
  const { setSnackbarMessage, setIsSnackbarOpen } = useContext(SnackbarContext);
  // =========== Use Context ============

  // Custom Hooks
  const { todoDispatch } = useTodo();
  // ========= Custom Hooks ==========

  // Functions
  const handleDeletion = () => {
    todoDispatch({ type: "deleted", payload: {currentTodo} });
    setIsModalOpen(false);
    setSnackbarMessage("تم حذف المهمة بنجاح");
    setIsSnackbarOpen(true);
  };
  // =========== Functions ===========

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
        onClick={() => setIsModalOpen(false)}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "20px",
          }}
          onClick={(e) => e.stopPropagation()} // prevent click inside modal from closing
        >
          <h2>هل انت متاكد من رغبتك في حذف المهمه؟</h2>
          <p
            style={{
              textAlign: "right",
              position: "relative",
              right: "10px",
              color: "gray",
            }}
          >
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </p>
          <Button
            variant="text"
            onClick={() => setIsModalOpen(false)}
            style={{ position: "relative", right: "113px", fontSize: "16px" }}
          >
            اغلاق
          </Button>
          <Button
            variant="text"
            onClick={() => handleDeletion()}
            style={{ position: "relative", right: "130px", fontSize: "16px" }}
          >
            نعم قم بالحذف
          </Button>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
