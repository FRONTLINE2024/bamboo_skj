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
    width,
  } = context;

  function sortingWidthOfContent() {
    if (previewImage && typeof previewImage === 'string') {
      const commonStyles = {
        borderRadius: width > 1000 ? '5px' : '3px',
        boxShadow: '0px 1px 3px 1px gray',
        cursor: 'pointer',
        marginBottom: width <= 1000 ? '2px' : undefined,
      };

      const size =
        width > 1000
          ? { width: 200, height: 200 }
          : { width: 130, height: 130 };

      return (
        <Image
          src={previewImage}
          style={commonStyles}
          alt="이미지"
          {...size}
          unoptimized={true}
          onClick={handleImageClick}
        />
      );
    }
  }

  return (
    <div className="row">
      <div className="content">
        {boardModify ? (
          <textarea
            className="boardContent2"
            value={selected.board_content}
            onChange={(e) =>
              inputSelectedBoardData('board_content', e.target.value)
            }
            aria-label="게시글 내용"
          />
        ) : (
          selected.board_content
        )}
      </div>

      {sortingWidthOfContent()}

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
