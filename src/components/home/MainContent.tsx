import Image from 'next/image';

// styles
import { DeleteBtn, Main } from '@/styles/styles';
import { Flex } from '@/styles/common/direction';

// libraries
import Cookie from 'js-cookie';

// types
import { BoardType } from '@/types/home';

interface MainContentType {
  data: BoardType[];
  getSelectedData: (data: BoardType) => void;
  boardDelete: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const MainContent = ({
  data,
  getSelectedData,
  boardDelete,
}: MainContentType) => {
  return (
    <Main>
      {data.map((d, i) => (
        <div
          className="boardContainer"
          key={i}
          onClick={() => getSelectedData(d)}
        >
          <div className="boardColumn">
            <div className="boardHeader">&nbsp;</div>
            <div className="boardRow">
              <div className="boardStructure">
                <div className="boardTitle">{d.board_title}</div>
                <span className="boardCreateAt">{d.createdAt}</span>
              </div>
              {typeof d.board_img === 'string' && (
                <Image
                  src={d.board_img}
                  alt="게시글 이미지"
                  width={50}
                  height={50}
                />
              )}
            </div>
            <div
              style={{
                ...Flex,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                padding: '4px',
                height: '80%',
              }}
            >
              {Cookie.get('user_index') === String(d.board_user_id) && (
                <DeleteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    boardDelete(d.id, e);
                  }}
                >
                  삭제
                </DeleteBtn>
              )}
            </div>
          </div>
        </div>
      ))}
    </Main>
  );
};

export default MainContent;
