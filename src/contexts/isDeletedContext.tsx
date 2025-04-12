import { createContext } from "react";

interface IsDeletedInterface {
  isDeleted: boolean;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteModalContext = createContext<IsDeletedInterface>({
  isDeleted: false,
  setIsDeleted: () => {}, 
});
