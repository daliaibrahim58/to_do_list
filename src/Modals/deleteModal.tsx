import Button from "@mui/material/Button";
import { useContext } from "react";
import { DeleteModalContext } from "../contexts/isDeletedContext";
import { TodosContext } from "../contexts/todoContext";
import { openDeletedModal } from "../contexts/openDeletedModal";

interface deleteModalPropsInterface {
  id: string;
}

function DeleteModal({ id }: deleteModalPropsInterface) {
  // Use States

  // =========== Use States =============

  // Use Context
  const { isDeleted, setIsDeleted } = useContext(DeleteModalContext);
  const { todosDataState, setTodosData } = useContext(TodosContext);
  const { setIsModalOpen } = useContext(openDeletedModal);
  // =========== Use Context ============

  // Functions
  const handleDeletion = () => {
    setIsDeleted(true);
    if (isDeleted) {
      const newTodos = todosDataState.filter((todo) => todo.id !== id);
      setTodosData(newTodos);
      localStorage.setItem("Todos", JSON.stringify(newTodos));
    }
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
