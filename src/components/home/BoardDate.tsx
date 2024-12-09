import { useContext } from 'react';
// contexts
import { boardContext } from '@/context/homeContext';

const BoardDate = () => {
  const context = useContext(boardContext);

  const { boardModify, selected, inputSelectedBoardData, width } = context;

  function sortingWidthOFDate(createAt: string) {
    switch (true) {
      case width < 800:
        return <span>{createAt.slice(10, 20)}</span>;
      default:
        return <span>{createAt}</span>;
    }
  }

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
        sortingWidthOFDate(selected.createdAt)
      )}
    </div>
  );
};

export default BoardDate;
