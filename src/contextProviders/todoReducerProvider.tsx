import TodoReducer from "../Reducers/todoReducer";
import { createContext, useContext, useReducer } from "react";
import { ActionType, todosInterface } from "../Types/todoActionType";

// Interfaces
interface TodoProvider {
  children: React.ReactNode;
}

interface TodoContextType {
  currentState: todosInterface[];
  todoDispatch: React.Dispatch<ActionType>;
}

// ====== Interfaces ======

export const TodoReducerContext = createContext<TodoContextType>({
  currentState: [],
  todoDispatch: () => {},
});

function TodoReducerProvider({ children }: TodoProvider) {
  const initialState = JSON.parse(localStorage.getItem("Todos") || "[]");
  const [currentState, todoDispatch] = useReducer(TodoReducer, initialState);
  return (
    <TodoReducerContext.Provider value={{ currentState, todoDispatch }}>
      {children}
    </TodoReducerContext.Provider>
  );
}

export default TodoReducerProvider;

export const useTodo = () => {
  return useContext(TodoReducerContext);
};
