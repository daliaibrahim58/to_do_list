import { createContext } from "react";

interface todosInterface {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

interface TodosContextType {
  todosDataState: todosInterface[];
  setTodosData: React.Dispatch<React.SetStateAction<todosInterface[]>>;
}

export const TodosContext = createContext<TodosContextType>({
  todosDataState: [],
  setTodosData: () => {},
});
