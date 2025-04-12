import "./App.css";
import ToDoList from "./components/toDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { TodosContext } from "./contexts/todoContext";
import { DeleteModalContext } from "./contexts/isDeletedContext";
import { openDeletedModal } from "./contexts/openDeletedModal";
import { OpenEditModal } from "./contexts/openEditModal";
import { ShowFieldAction } from "./contexts/showFieldAction";
import { useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Amiri",
  },
  palette: {
    primary: {
      main: "#7735ca",
    },
    secondary: {
      main: "#88CA35",
    },
  },
});

// Interfaces
interface todosInterface {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

function App() {
  // Vars
  // ============= Vars============
  // States
  const [todosDataState, setTodosData] = useState<todosInterface[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFieldAction, setShowFieldAction] = useState(false); // Error visibility state for field
  // ======= State ===========

  // Use Effect
  useEffect(() => {
    const todosFromLocalStorage = JSON.parse(
      localStorage.getItem("Todos") || "[]"
    );
    setTodosData(todosFromLocalStorage);
    console.log(todosDataState);
  }, []);

  // ========= Use Effect ==========
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          direction: "rtl",
          height: "100vh",
          backgroundColor: "#F7F7F7",
        }}
      >
        <TodosContext.Provider value={{ todosDataState, setTodosData }}>
          <DeleteModalContext.Provider value={{ isDeleted, setIsDeleted }}>
            <openDeletedModal.Provider value={{ isModalOpen, setIsModalOpen }}>
              <OpenEditModal.Provider
                value={{ isEditModalOpen, setIsEditModalOpen }}
              >
                <ShowFieldAction.Provider
                  value={{ showFieldAction, setShowFieldAction }}
                >
                  <ToDoList></ToDoList>
                </ShowFieldAction.Provider>
              </OpenEditModal.Provider>
            </openDeletedModal.Provider>
          </DeleteModalContext.Provider>
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
