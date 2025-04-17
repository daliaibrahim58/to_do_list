import "./App.css";
import ToDoList from "./components/toDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { CurrentTodo } from "./contexts/currentTodo";
import SnackbarProvider from "./contextProviders/snackbarProvider";
import TodoReducerProvider from "./contextProviders/todoReducerProvider";
import { useTodo } from "./contextProviders/todoReducerProvider";

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
  const [currentTodo, setCurrentTodo] = useState<todosInterface>({
    id: "",
    title: "",
    content: "",
    isCompleted: false,
  });
  // ======= State ===========

  // Custom Hooks
  const { todoDispatch } = useTodo();
  // ============= Custom Hooks =============

  // Use Effect
  useEffect(() => {
    console.log("Hi");
    todoDispatch({ type: "get" });
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
        <TodoReducerProvider>
          <CurrentTodo.Provider value={{ currentTodo, setCurrentTodo }}>
            <SnackbarProvider>
              {/* Todo List */}
              <ToDoList />
              {/* ====== Todo List ======= */}
            </SnackbarProvider>
          </CurrentTodo.Provider>
        </TodoReducerProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
