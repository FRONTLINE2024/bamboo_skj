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
  width: number;
  height: number;
}

const MainContent = ({
  data,
  getSelectedData,
  boardDelete,
  getPagingBoard,
  width,
  height,
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

    const currentRef = bottomRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  function sortingWidthOfTitle(title: string) {
    switch (true) {
      case width > 970:
        return <span>{title}</span>;
      case width < 970 && width > 850:
        return <span>{`${title.slice(0, 3)}...`}</span>;
      case width < 850:
        return <span>{`${title}`}</span>;
      default:
        break;
    }
  }

  function sortingWidthOfImage(img: string | File | null) {
    switch (true) {
      case width < 1500:
        return (
          img &&
          typeof img === 'string' && (
            <Image
              src={img}
              alt="게시글 이미지"
              width={50}
              height={50}
              priority
            />
          )
        );
    }
  }

  return (
    <Main aria-label="전체데이터" $width={width}>
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
                <div className="boardTitle">
                  {sortingWidthOfTitle(d.board_title)}
                </div>
                <span className="boardCreateAt">
                  {width < 970 ? `${d.createdAt.slice(5, 16)}` : d.createdAt}
                </span>
              </div>
              {sortingWidthOfImage(d.board_img)}
            </div>
            <div
              className="btnRow"
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
