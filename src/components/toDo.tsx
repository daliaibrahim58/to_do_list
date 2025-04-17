import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { useContext } from "react";
import { openDeletedModal } from "../contexts/openDeletedModal";
import { OpenEditModal } from "../contexts/openEditModal";
import { CurrentTodo } from "../contexts/currentTodo";
import { SnackbarContext } from "../contexts/snackbarContext";
import { useTodo } from "../contextProviders/todoReducerProvider";
import { todosInterface } from "../Types/todoActionType";

// Interfaces
interface todoObj {
  todo: todosInterface;
}

export default function ToDo({ todo }: todoObj) {
  const theme = useTheme() as Theme;

  // Custom Hooks
  const { todoDispatch } = useTodo();
  // ====== Custom Hooks ======

  // Use Context
  const { setIsModalOpen } = useContext(openDeletedModal);
  const { setIsEditModalOpen } = useContext(OpenEditModal);
  const { setCurrentTodo } = useContext(CurrentTodo);
  const { setSnackbarMessage, setIsSnackbarOpen } = useContext(SnackbarContext);
  // =========== Use Context ============

  // Functions
  const handleCompleteCheck = () => {
    const wasCompleted = todo.isCompleted; // ✅ was accessing `e.target.value.isCompleted` incorrectly
    todoDispatch({ type: "completed", payload: { currentTodo: todo } });

    // Snackbar
    setIsSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarMessage(
        !wasCompleted
          ? "تمت الإضافة الي المهام المنجزة بنجاح"
          : "تمت الازالة من المهام المنجزة"
      );
      setIsSnackbarOpen(true);
    }, 100);
  };

  const handleDeleteCheck = () => {
    setIsModalOpen(true);
    setCurrentTodo(todo);
  };

  const handleEditCheck = () => {
    setIsEditModalOpen(true);
    setCurrentTodo(todo);
  };

  return (
    <>
      <Card
        className="to_do_card"
        style={{
          backgroundColor: theme.palette.primary.main,
          margin: "15px 0 10px",
          width: "100%",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 8 }}>
              <Typography
                gutterBottom
                sx={{ color: "#fff", fontSize: 25, textAlign: "right" }}
              >
                <p
                  style={{
                    padding: "0px",
                    margin: "0px",
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </p>
                <p style={{ padding: "0px", margin: "0px" }}>{todo.content}</p>
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 4 }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <DoneIcon
                className="icon"
                style={{
                  backgroundColor: todo.isCompleted ? "#4CAF50" : "#fff",
                  padding: "7px",
                  borderRadius: "20px",
                  color: todo.isCompleted ? "#fff" : "#4CAF50",
                }}
                onClick={() => handleCompleteCheck()}
              />
              <EditIcon
                className="icon"
                style={{
                  backgroundColor: "#fff",
                  padding: "7px",
                  borderRadius: "20px",
                  border: "1px solidrgba(41, 98, 255, 0.93)",
                  color: "#2962ff",
                }}
                onClick={() => handleEditCheck()}
              />
              <DeleteIcon
                className="icon"
                style={{
                  backgroundColor: "#fff",
                  padding: "7px",
                  borderRadius: "20px",
                  border: "1px solid red",
                  color: "red",
                }}
                onClick={() => handleDeleteCheck()}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
