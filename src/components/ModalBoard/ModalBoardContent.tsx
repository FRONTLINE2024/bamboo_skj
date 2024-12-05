import { navContext } from '@/context/homeContext';
import { WriteBtn } from '@/styles/styles';
import React, { useContext } from 'react';

const ModalBoardContent = () => {
  const context = useContext(navContext);

  const { inputBoardData, handleBoardImg, writeBoard } = context;
  return (
    <div className="boardWriteContainer">
      <div className="boardWriteTitle">
        <input
          className="boardTitleInput"
          placeholder="제목"
          onChange={(e) => inputBoardData('board_title', e.target.value)}
        />
      </div>
      <textarea
        className="boardContent"
        placeholder="글 내용 작성"
        onChange={(e) => inputBoardData('board_content', e.target.value)}
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
  );
};

export default ModalBoardContent;
