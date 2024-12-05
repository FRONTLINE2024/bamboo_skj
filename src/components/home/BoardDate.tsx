import { useContext } from 'react';
// contexts
import { boardContext } from '@/context/homeContext';

const BoardDate = () => {
  const context = useContext(boardContext);

  const { boardModify, selected, inputSelectedBoardData } = context;
  return (
    <div className="date">
      {' '}
      {boardModify ? (
        <input
          className="boardTitleInput"
          value={selected.createdAt}
          onChange={(e) => inputSelectedBoardData('createdAt', e.target.value)}
          aria-label="게시글 생성일"
        />
      ) : (
        selected.createdAt
      )}
    </div>
  );
};

export default BoardDate;
