import { SetStateAction } from 'react';

export interface useModalOpenType {
  isOpened: boolean;
  setIsOpened: React.Dispatch<SetStateAction<boolean>>;
}

const useModalOpen = ({ isOpened, setIsOpened }: useModalOpenType) => {
  function openModal() {
    setIsOpened(!isOpened);
  }

  return openModal;
};

export default useModalOpen;
