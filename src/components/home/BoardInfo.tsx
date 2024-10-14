import Image from 'next/image';

// styles
import { ModifyBtn } from '@/styles/styles';

// libraries
import Cookie from 'js-cookie';
import { BoardType } from '@/types/home';
import { MutableRefObject } from 'react';
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
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '5px',
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
          />
        ) : (
          selected.board_title
        )}
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
            />
          ) : (
            selected.board_content
          )}
        </div>

        {typeof selected.board_img === 'string' && (
          <Image
            src={selected.board_img}
            style={{
              borderRadius: '5px',
              boxShadow: '0px 1px 3px 1px gray',
              cursor: 'pointer', // 이미지에 커서 포인터 추가
            }}
            alt="이미지"
            width={200}
            height={200}
            unoptimized={true}
            onClick={handleImageClick} // 이미지를 클릭했을 때 파일 입력 클릭
          />
        )}
        {boardModify && (
          <input
            type="file"
            ref={fileInputRef} // useRef로 파일 입력 참조 연결
            style={{ display: 'none' }} // 파일 입력은 화면에서는 보이지 않음
            onChange={(e) => {
              handleSelectedImg(e);
            }}
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
            <ModifyBtn onClick={() => PatchBoardData()}>확인</ModifyBtn>
          ) : (
            <ModifyBtn onClick={() => modifyChange()}>수정</ModifyBtn>
          ))}
      </div>
    </div>
  );
};

export default BoardInfo;
