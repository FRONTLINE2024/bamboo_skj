import { SetStateAction } from 'react';

// styles
import { Nav, WriteBtn } from '@/styles/styles';

// components
import ModalBoard from './ModalBoard';
import ModalBoardContent from '../ModalBoard/ModalBoardContent';
import SortSelect from '../ModalBoard/SortSelect';

interface NavBarType {
  setIsBoardOpened: React.Dispatch<SetStateAction<boolean>>;
  isBoardOpened: boolean;
  openModalBoard: () => void;
}

const NavBar = ({
  setIsBoardOpened,
  isBoardOpened,
  openModalBoard,
}: NavBarType) => {
  return (
    <Nav>
      <div></div>
      <div></div>
      <div className="navRow">
        <WriteBtn onClick={() => setIsBoardOpened(true)}>작성</WriteBtn>
        {isBoardOpened && (
          <ModalBoard modal={isBoardOpened} openModal={openModalBoard}>
            <ModalBoardContent />
          </ModalBoard>
        )}
        <SortSelect />
      </div>
    </Nav>
  );
};

export default NavBar;
