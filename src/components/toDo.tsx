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
import { TodosContext } from "../contexts/todoContext";
import { openDeletedModal } from "../contexts/openDeletedModal";
import DeleteModal from "../Modals/deleteModal";
import { OpenEditModal } from "../contexts/openEditModal";
import EditModal from "../Modals/editModal";

// Vars
interface ToDoProps {
  id: string;
  title: string;
  content: string;
}

export default function ToDo({ id, title, content }: ToDoProps) {
  const theme = useTheme() as Theme;

  // Use Context
  const { todosDataState, setTodosData } = useContext(TodosContext);
  const { isModalOpen, setIsModalOpen } = useContext(openDeletedModal);
  const { isEditModalOpen, setIsEditModalOpen } = useContext(OpenEditModal);
  // =========== Use Context ============

  // Functions
  const currentTodo = todosDataState.find((todo) => todo.id === id); // Use find() instead of filter()

  const handleCompleteCheck = () => {
    const newTodos = todosDataState.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodosData(newTodos);
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };

  const handleDeleteCheck = () => {
    setIsModalOpen(true);
    console.log(isModalOpen); // Debug
  };

  const handleEditCheck = () => {
    setIsEditModalOpen(true);
    console.log(isEditModalOpen); // Debug
  };
  // ============= Functions ==============

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
                    textDecoration: currentTodo?.isCompleted
                      ? "line-through"
                      : "none",
                  }}
                >
                  {title}
                </p>
                <p style={{ padding: "0px", margin: "0px" }}>{content}</p>
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
                  backgroundColor: currentTodo?.isCompleted
                    ? "#4CAF50"
                    : "#fff",
                  padding: "7px",
                  borderRadius: "20px",
                  color: currentTodo?.isCompleted ? "#fff" : "#4CAF50",
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

      {/* ✅ Now DeleteModal will actually appear when `isModalOpen` is true */}
      {isModalOpen && <DeleteModal id={id} />}
      {isEditModalOpen && <EditModal id={id} />}
    </>
  );
}
