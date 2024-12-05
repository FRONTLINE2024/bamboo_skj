import { useContext } from 'react';
import Image from 'next/image';

// contexts
import { boardContext } from '@/context/homeContext';

interface BoardContentType {
  previewImage: string | File | null;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => (() => void) | undefined;
}
const BoardContent = ({ previewImage, handleFileChange }: BoardContentType) => {
  const context = useContext(boardContext);

  const {
    boardModify,
    inputSelectedBoardData,
    selected,
    handleImageClick,
    fileInputRef,
  } = context;
  return (
    <div className="row">
      <div className="content">
        {boardModify ? (
          <textarea
            className="boardContent2"
            value={selected.board_content}
            style={{ height: '20vh' }}
            onChange={(e) =>
              inputSelectedBoardData('board_content', e.target.value)
            }
            aria-label="게시글 내용"
          />
        ) : (
          selected.board_content
        )}
      </div>

      {previewImage && typeof previewImage === 'string' && (
        <Image
          src={previewImage}
          style={{
            borderRadius: '5px',
            boxShadow: '0px 1px 3px 1px gray',
            cursor: 'pointer',
          }}
          alt="이미지"
          width={200}
          height={200}
          unoptimized={true}
          onClick={handleImageClick}
        />
      )}
      {boardModify && (
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFileChange(e);
          }}
          aria-label="이미지 업로드"
        />
      )}
    </div>
  );
};

export default BoardContent;
