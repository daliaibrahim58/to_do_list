import { createContext } from "react";

interface openDeletedModalInterface {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const openDeletedModal = createContext<openDeletedModalInterface>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});
