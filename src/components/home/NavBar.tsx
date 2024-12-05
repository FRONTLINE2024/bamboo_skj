import { SetStateAction, useContext } from 'react';

// styles
import { Nav, WriteBtn } from '@/styles/styles';
import { Flex } from '@/styles/common/direction';
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
      <div style={{ ...Flex, width: '10vw', justifyContent: 'space-between' }}>
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
