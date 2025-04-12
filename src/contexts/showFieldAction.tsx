import { createContext } from "react";

interface showFieldAction {
  showFieldAction: boolean;
  setShowFieldAction: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ShowFieldAction = createContext<showFieldAction>({
  showFieldAction: false,
  setShowFieldAction: () => {},
});
