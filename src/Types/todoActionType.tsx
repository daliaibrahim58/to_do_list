// Interfaces
export interface todosInterface {
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
  }
  
  interface AddAction {
    type: "added";
    payload: {
      inputText: string;
    };
  }
  
  interface CompleteAction {
    type: "completed";
    payload: {
      currentTodo: todosInterface;
    };
  }
  
  interface DeleteAction {
    type: "deleted";
    payload: {
      currentTodo: todosInterface;
    };
  }
  
  interface EditAction {
    type: "edited";
    payload: {
      currentTodo: todosInterface;
      title: string;
      content: string;
    };
  }
  
  interface GetAction {
    type: "get";
  }
  
  export type ActionType =
    | AddAction
    | CompleteAction
    | DeleteAction
    | EditAction
    | GetAction;
  // ========= Interfaces ==========