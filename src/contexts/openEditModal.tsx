import { createContext } from "react";

interface openEditModalInterface {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpenEditModal = createContext<openEditModalInterface>({
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
});
