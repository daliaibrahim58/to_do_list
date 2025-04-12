import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./toDo";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { useState } from "react";
import FieldAction from "../Actions/fieldActions";
import { useContext } from "react";
import { TodosContext } from "../contexts/todoContext";
import { ShowFieldAction } from "../contexts/showFieldAction";

// Others
import { v4 as uuidv4 } from "uuid";

// Vars
interface todosInterface {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

function ToDoList() {
  // Use Context
  const { todosDataState, setTodosData } = useContext(TodosContext);
  const { showFieldAction, setShowFieldAction } = useContext(ShowFieldAction);
  // =========== Use Context ============
  // States
  const [inputText, setInputText] = useState("");
  const [toggleBtnVal, setToggleBtnVal] = useState("all");
  // ========= States ============

  // Vars
  let renderedTodo = todosDataState;
  // ===== Vars ======

  // Todos Will Render
  const completed = todosDataState.filter((todo) => {
    return todo.isCompleted;
  });

  const notCompleted = todosDataState.filter((todo) => {
    return !todo.isCompleted;
  });

  // If Conditions
  if (toggleBtnVal == "all") renderedTodo = todosDataState;
  else if (toggleBtnVal == "completed") renderedTodo = completed;
  else if (toggleBtnVal == "not_completed") renderedTodo = notCompleted;
  // ========== If Conditions ==========

  // ======== Todos Will Render ========

  // TODo UI
  const todosUI = renderedTodo.map((todoData: todosInterface) => (
    <ToDo
      key={todoData.id}
      id={todoData.id}
      title={todoData.title}
      content={todoData.content}
    />
  ));
  // ====== TDO UI

  // Functions
  const handleAddTodo = function () {
    if (inputText !== "") {
      const newTodo: todosInterface = {
        id: uuidv4(),
        title: inputText,
        content: "",
        isCompleted: false,
      };
      const updatedTodo = [...todosDataState, newTodo];
      setTodosData(updatedTodo);
      localStorage.setItem("Todos", JSON.stringify(updatedTodo));
      setInputText("");
      setShowFieldAction(false);
    } else {
      setShowFieldAction(true);
    }
  };
  // =========== Functions =============

  const theme = useTheme() as Theme;
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "20px",
      }}
    >
      <Card style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <CardContent>
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              backgroundColor: "#fff", // Important to avoid overlap issues
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h1"
              style={{ fontSize: "40px", fontWeight: "bold" }}
            >
              مهامي
            </Typography>
            <Divider style={{ marginTop: "-10px" }} />

            {/* Toggle Buttons */}
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              value={toggleBtnVal}
              style={{ direction: "ltr", marginTop: "30px" }}
              onChange={(e) =>
                setToggleBtnVal((e.target as HTMLInputElement).value)
              }
            >
              <ToggleButton value="not_completed" aria-label="left aligned">
                الغير منجز
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                {" "}
                المنجز
              </ToggleButton>
              <ToggleButton value="all" aria-label="right aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup>

            {/*===Toggle Buttons */}

            {/* Text field area */}
            <Grid container spacing={2} sx={{ marginTop: 5 }}>
              <Grid size={10}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  sx={{ width: "100%", height: "100%" }}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Grid>
              <Grid size={2}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.palette.secondary.main,
                  }}
                  onClick={() => handleAddTodo()}
                >
                  اضافه
                </Button>
              </Grid>
            </Grid>
            {/*Field Action */}
            <FieldAction display={showFieldAction} />
            {/*==== Field Action ======= */}
            {/*========Text Field Area======= */}
          </div>

          {/*To_Do_Component */}
          <Stack spacing={2}>{todosUI}</Stack>
          {/*=========To_Do_Component======== */}
        </CardContent>
      </Card>
    </Container>
  );
}

export default ToDoList;
