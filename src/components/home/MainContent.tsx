import Image from 'next/image';
import { useEffect, useRef } from 'react';

// styles
import { DeleteBtn, Main } from '@/styles/styles';
import { Flex } from '@/styles/common/direction';

// libraries
import Cookie from 'js-cookie';
import { MutateOptions } from '@tanstack/react-query';

// types
import { BoardType } from '@/types/home';

interface MainContentType {
  data: BoardType[];
  getSelectedData: (data: BoardType) => void;
  boardDelete: (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  getPagingBoard: (
    variables: void,
    options?: MutateOptions<BoardType[], Error, void, unknown> | undefined
  ) => void;
}

const MainContent = ({
  data,
  getSelectedData,
  boardDelete,
  getPagingBoard,
}: MainContentType) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getPagingBoard();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.8,
      }
    );

    const currentRef = bottomRef.current; // 현재 ref 값을 변수에 복사

    if (currentRef) {
      observer.observe(currentRef); // 변수 사용
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // 클린업 시 변수 사용
      }
    };
  }, []);

  return (
    <Main aria-label="전체데이터">
      {data.map((d, i) => (
        <div
          className="boardContainer"
          key={i}
          onClick={() => getSelectedData(d)}
          aria-label="게시글선택"
        >
          <div className="boardColumn">
            <div className="boardHeader">&nbsp;</div>
            <div className="boardRow">
              <div className="boardStructure">
                <div className="boardTitle">{d.board_title}</div>
                <span className="boardCreateAt">{d.createdAt}</span>
              </div>
              {d.board_img && typeof d.board_img === 'string' && (
                <Image
                  src={d.board_img}
                  alt="게시글 이미지"
                  width={50}
                  height={50}
                  priority
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
      <div ref={bottomRef} className="bottom" style={{ height: '10px' }}></div>
    </Main>
  );
};

export default MainContent;
