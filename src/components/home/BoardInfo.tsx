import Image from 'next/image';
import { MutableRefObject, useState } from 'react';

// styles
import { ModifyBtn } from '@/styles/styles';
import { Flex } from '@/styles/common/direction';

// libraries
import Cookie from 'js-cookie';

// types
import { BoardType } from '@/types/home';

// constants
import { universities } from '@/constants/universities';

interface BoardInfoType {
  selected: BoardType;
  boardModify: boolean;
  inputSelectedBoardData(sort: string, value: string | number): void;
  handleImageClick: () => void;
  handleSelectedImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  PatchBoardData(): void;
  modifyChange(): void;
}

const BoardInfo = ({
  selected,
  boardModify,
  inputSelectedBoardData,
  handleImageClick,
  handleSelectedImg,
  fileInputRef,
  PatchBoardData,
  modifyChange,
}: BoardInfoType) => {
  const [previewImage, setPreviewImage] = useState(selected.board_img);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      handleSelectedImg(e);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  function sortingLogo(universityName: string) {
    if (universityName) {
      const logo = universities.filter(
        (university) => university.name === universityName
      );
      // console.log(logo);

      return (
        <Image
          src={logo[0].img.src}
          alt="대학교로고"
          width={25}
          height={25}
          style={{ objectFit: 'contain' }}
        />
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '5px',
        marginTop: '2rem',
      }}
    >
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
      <div
        style={{
          ...Flex,
          width: '200px',
          height: '30px',
          justifyContent: 'flex-start',
          fontFamily: 'GmarketSansBold',
        }}
      >
        {sortingLogo(selected.university)}
        <span style={{ marginLeft: '5px' }}>{selected.user_nickname}</span>
      </div>
      <div className="date">
        {' '}
        {boardModify ? (
          <input
            className="boardTitleInput"
            value={selected.createdAt}
            onChange={(e) =>
              inputSelectedBoardData('createdAt', e.target.value)
            }
            aria-label="게시글 생성일"
          />
        ) : (
          selected.createdAt
        )}
      </div>
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
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          height: '12vh',
        }}
      >
        {Cookie.get('user_index') === String(selected.board_user_id) &&
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
    </div>
  );
};

export default BoardInfo;
