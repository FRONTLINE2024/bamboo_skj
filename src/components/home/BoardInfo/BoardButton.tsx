import { boardContext } from '@/context/homeContext';
import { ModifyBtn } from '@/styles/styles';
import Cookies from 'js-cookie';
import { useContext } from 'react';

const BoardButton = () => {
  const context = useContext(boardContext);

  const { selected, boardModify, PatchBoardData, modifyChange } = context;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: '12vh',
      }}
    >
      {Cookies.get('user_index') === String(selected.board_user_id) &&
        (boardModify ? (
          <ModifyBtn
            aria-label="게시글수정확인"
            onClick={() => PatchBoardData()}
          >
            확인
          </ModifyBtn>
        ) : (
          <ModifyBtn aria-label="게시글수정" onClick={() => modifyChange()}>
            수정
          </ModifyBtn>
        ))}
    </div>
  );
};

export default BoardButton;
