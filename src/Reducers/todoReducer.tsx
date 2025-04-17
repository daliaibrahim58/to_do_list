// Others
import { v4 as uuidv4 } from "uuid";
import { ActionType } from "../Types/todoActionType";
import { todosInterface } from "../Types/todoActionType";

export default function TodoReducer(
  currentState: todosInterface[],
  action: ActionType
) {
  switch (action.type) {
    case "added": {
      const newTodo: todosInterface = {
        id: uuidv4(),
        title: action.payload.inputText,
        content: "",
        isCompleted: false,
      };
      const updatedTodo = [...currentState, newTodo];
      localStorage.setItem("Todos", JSON.stringify(updatedTodo));
      return updatedTodo;
    }

    case "completed": {
      const newTodos = currentState.map((todo: todosInterface) =>
        todo.id === action.payload.currentTodo.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      localStorage.setItem("Todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "deleted": {
      const newTodos = currentState.filter(
        (todo: todosInterface) => todo.id !== action.payload.currentTodo.id
      );
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      return newTodos;
    }

    case "edited": {
      const updatedTodos = currentState.map((todo) =>
        todo.id === action.payload.currentTodo.id
          ? {
              ...todo,
              title: action.payload.title,
              content: action.payload.content,
            }
          : todo
      );

      localStorage.setItem("Todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("This action does not exist");
    }
  }
}
