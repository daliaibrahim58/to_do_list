import { createContext } from "react";

interface todoInterface {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}
interface currTodoContextInterface {
  currentTodo: todoInterface;
  setCurrentTodo: React.Dispatch<React.SetStateAction<todoInterface>>;
}
export const CurrentTodo = createContext<currTodoContextInterface>({
  currentTodo: { id: "", title: "", content: "", isCompleted: false },
  setCurrentTodo: () => {},
});
