import { useContext } from 'react';
// contexts
import { boardContext } from '@/context/homeContext';

const BoardTitle = () => {
  const context = useContext(boardContext);

  const { boardModify, inputSelectedBoardData, selected } = context;
  return (
    <div className="publisher">
      {boardModify ? (
        <input
          className="boardTitleInput"
          value={selected.board_title}
          onChange={(e) =>
            inputSelectedBoardData('board_title', e.target.value)
          }
          aria-label="게시글 제목"
        />
      ) : (
        selected.board_title
      )}
    </div>
  );
};

export default BoardTitle;
