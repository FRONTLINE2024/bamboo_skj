import { Flex } from '@/styles/common/direction';
import { Nav, WriteBtn } from '@/styles/styles';
import ModalBoard from './ModalBoard';
import { useContext } from 'react';
import { navContext } from '@/context/homeContext';

const NavBar = () => {
  const context = useContext(navContext);

  const {
    setIsBoardOpened,
    isBoardOpened,
    openModalBoard,
    inputBoardData,
    handleBoardImg,
    writeBoard,
    sortingBoards,
    sortValues,
  } = context;

  return (
    <Nav>
      <div></div>
      <div></div>
      <div style={{ ...Flex, width: '10vw', justifyContent: 'space-between' }}>
        <WriteBtn onClick={() => setIsBoardOpened(true)}>작성</WriteBtn>
        {isBoardOpened && (
          <ModalBoard modal={isBoardOpened} openModal={openModalBoard}>
            <div className="boardWriteContainer">
              <div className="boardWriteTitle">
                <input
                  className="boardTitleInput"
                  placeholder="제목"
                  onChange={(e) =>
                    inputBoardData('board_title', e.target.value)
                  }
                />
              </div>
              <textarea
                className="boardContent"
                placeholder="글 내용 작성"
                onChange={(e) =>
                  inputBoardData('board_content', e.target.value)
                }
              />
              <div className="boardWriteFile">
                <label htmlFor="file">
                  <div className="btnUpload">이미지 업로드</div>
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => handleBoardImg(e)}
                />
                <WriteBtn onClick={writeBoard}>작성 완료</WriteBtn>
              </div>
            </div>
          </ModalBoard>
        )}
        <select
          name="sortValue"
          id="sortValue"
          onChange={(e) => sortingBoards(e.target.value)}
        >
          {sortValues.map((v, i) => (
            <option className="sortButton" key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </Nav>
  );
};

export default NavBar;
