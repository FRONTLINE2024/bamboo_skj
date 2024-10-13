import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import {
  Container,
  DeleteBtn,
  HomeHeader,
  HomeInput,
  Main,
  ModifyBtn,
  Nav,
  WriteBtn,
} from '@/styles/styles';
import { Flex } from '@/styles/common/direction';

// icons
import { IoSearch } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

// libraries
import axios from 'axios';
import Cookie from 'js-cookie';
import { useMutation, useQuery } from '@tanstack/react-query';

// types
import { BoardDataType, BoardType } from '@/types/home';
import { IMessage } from '@/types/chat';

//constants
import { sortValues } from '@/constants/boardSortingValue';
import { useRecoilState } from 'recoil';
import { selectedPost } from '@/atom/state';

// compnents
import Modal from '@/components/common/Modal';
import ModalBoard from '@/components/home/ModalBoard';

// hooks
import useModalOpen, { useModalOpenType } from '@/hooks/home/useModalOpen';
import { useSocket } from '@/components/provider/SocketWrapper';

// apis
import {
  AllData,
  AscendData,
  ContentAscendData,
  DescendData,
  deleteBoardData,
  getSpecificBoard,
  patchBoardData,
  postBoardData,
} from './api/clients/home';
import useFormData, { FormDataType } from '@/hooks/home/useFormData';

const Home = () => {
  const router = useRouter();

  // 채팅
  const { socket } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  // 컴포넌트 내에서
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 게시글 수정
  const [boardModify, setBoardModify] = useState<boolean>(false);
  // 선택된 데이터
  const [selected, setSelected] = useRecoilState<BoardType>(selectedPost);
  // 모달 boolean
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // board boolean
  const [isBoardOpened, setIsBoardOpened] = useState<boolean>(false);
  // 전체 데이터
  const [data, setData] = useState<BoardType[]>([
    {
      id: 0,
      board_title: '',
      board_content: '',
      board_user_id: '',
      board_img: '',
      createdAt: '',
    },
  ]);
  // 게시글 입력 데이터
  const [boardData, setBoardData] = useState<BoardDataType>({
    board_title: '',
    board_content: '',
    board_img: null,
    board_user_id: 0,
    createdAt: '',
  });

  const { board_title, board_content, board_img, createdAt } = boardData;

  // 이미지 수정
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 게시글 input
  function inputBoardData(sort: string, value: string | number) {
    setBoardData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  // 게시글 input
  function inputSelectedBoardData(sort: string, value: string | number) {
    setSelected((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  // FormData 생성
  const formData = useFormData({
    board_title,
    board_content,
    board_user_id: `${Cookie.get('user_index')}`,
    createdAt,
    board_img,
  });

  // 게시글 저장
  const boardWrite = useMutation({
    mutationKey: ['boardWrite'],
    mutationFn: async () => {
      const response = await postBoardData(formData);

      console.log(response);
    },
    onSuccess: () => {
      closeModalBoard();
      getData.refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 게시글 post 실행 함수
  function writeBoard() {
    const time = new Date();

    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();

    const times = time.toLocaleString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const createdAt = `${year}-${month}-${date} ${times}`;
    console.log('createdAt: ', createdAt);

    setBoardData((prev) => ({
      ...prev,
      createdAt,
    }));
    if (
      board_title.length > 0 &&
      board_content.length > 0 &&
      createdAt.length > 0
    ) {
      boardWrite.mutate();
    } else {
      // 셋 중 하나라도 없으면 modal 띄우기 로직 작성
    }
  }

  // 이미지 가져오는 함수
  function getImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0] || null; // 파일 또는 null
    if (file) {
      setBoardData((prev) => ({
        ...prev,
        board_img: file, // Blob 타입을 사용
      }));
    }
  }
  // 게시글
  function getImgs(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0] || null; // 파일 또는 null
    if (file) {
      setSelected((prev) => ({
        ...prev,
        board_img: file, // Blob 타입을 사용
      }));
    }
  }

  // 수정 버튼 변환
  function modifyChange() {
    setBoardModify(!boardModify);
  }

  // 게시글 수정
  function PatchBoardData() {
    setBoardModify(false);
    patchBoard.mutate();
  }

  // 게시글 선택
  function getSelectedData(data: BoardType) {
    setSelected(data);
    setIsOpened(true);
  }

  // 게시글 모달열기
  function openModal() {
    const object: useModalOpenType = {
      isOpened,
      setIsOpened,
    };
    const execute = useModalOpen(object);
    execute();
  }

  // 게시글 작성 모달 열기
  function openModalBoard() {
    setIsBoardOpened(!isBoardOpened);
  }

  // 게시글 모달 닫기
  function closeModal() {
    setIsOpened(false);
  }

  // 게시글 작성 모달 닫기
  function closeModalBoard() {
    setIsBoardOpened(false);
  }

  // 특정 게시글 데이터 가져오기
  const getSpecificBoardData = useQuery({
    queryKey: ['getSpecificBoardData', selected.id],
    queryFn: async () => {
      const response = await getSpecificBoard(selected.id);
      console.log(response);
      return response.data;
    },
    enabled: false, // 기본적으로 비활성화하여 자동 실행을 막음
  });

  useEffect(() => {
    if (getSpecificBoardData.isSuccess) {
      setSelected(getSpecificBoardData.data.data);
    }
  }, [getSpecificBoardData.isSuccess, getSpecificBoardData.data]);

  // hook을 통해 FormData 생성
  const formPatchData = useFormData({
    id: `${selected.id}`,
    board_title: selected.board_title,
    board_content: selected.board_content,
    board_user_id: `${Cookie.get('user_index')}`,
    createdAt: selected.createdAt,
    board_img: selected.board_img, // 필요한 데이터 포함
  });

  // 게시글 수정
  const patchBoard = useMutation({
    mutationKey: ['patchBoard'],
    mutationFn: async () => {
      const response = await patchBoardData(formPatchData);

      console.log(response);

      return response.data;
    },
    onSuccess: () => {
      getSpecificBoardData.refetch();
      getData.refetch();
    },
  });

  // 게시글 삭제
  const deleteBoard = useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: async (id: number) => {
      const board_user_id = Cookie.get('user_index');
      console.log(typeof board_user_id);
      const body = {
        data: { id, board_user_id },
      };
      const response = await deleteBoardData(body);

      console.log(response);

      return response.data;
    },
    onSuccess: () => {
      getData.refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 게시글 삭제 함수
  function boardDelete(
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    deleteBoard.mutate(id);
  }

  // 전체 데이터
  const getData = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const response = await AllData();

      console.log(response);

      if (response.status === 200) {
        setData(response.data);
      }

      return response.data;
    },
  });

  // 오래된 순
  const getDateAscendData = useMutation({
    mutationKey: ['DateAscendData'],
    mutationFn: async () => {
      const response = await AscendData();

      if (response.status === 200) {
        setData(response.data.data);
      }

      return response.data;
    },
    onError(err) {
      console.log(err);
    },
  });

  // 최신순
  const getDateDescendData = useMutation({
    mutationKey: ['DateDescendData'],
    mutationFn: async () => {
      const response = await DescendData();

      if (response.status === 200) {
        setData(response.data.data);
      }

      return response.data;
    },
    onError(err) {
      console.log(err);
    },
  });

  // 이름순
  const getContentAscendData = useMutation({
    mutationKey: ['ContentAscendData'],
    mutationFn: async () => {
      const response = await ContentAscendData();

      if (response.status === 200) {
        setData(response.data.data);
      }

      return response.data;
    },
    onError(err) {
      console.log(err);
    },
  });

  function sortingBoards(value: string) {
    switch (value) {
      case '최신순':
        getDateDescendData.mutate();
        break;
      case '오래된 순':
        getDateAscendData.mutate();
        break;
      case '이름순':
        getContentAscendData.mutate();
        break;
    }
  }

  // 메세지 보내기
  const sendMessage = async () => {
    if (currentMessage) {
      // const res = await fetch('/api/chat', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     user: username,
      //     content: currentMessage,
      //   }),
      // });
      // if (res.ok) setCurrentMessage('');
      const res = await axios.post('/api/chat', {
        user: 'test',
        content: currentMessage,
      });

      console.log(res);
    }
  };

  useEffect(() => {
    socket?.on('message', (message: IMessage) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  // 토큰 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (Cookie.get('token') === undefined) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    console.log('boardData: ', boardData);
    console.log('selected: ', selected);
  }, [boardData, selected]);

  // if (getData.isLoading) return <div>Loading...</div>;

  return (
    // <h1>Home</h1>
    <Container>
      <div id="modal-container"></div>
      <div id="modal-container2"></div>
      {isOpened && (
        <div className="background" onClick={closeModal}>
          {' '}
        </div>
      )}
      {isBoardOpened && (
        <div className="background" onClick={closeModalBoard}>
          {' '}
        </div>
      )}
      <HomeHeader>
        <span className="projectTitle">FrontLine▹</span>
        <HomeInput />
        <div className="headerContainer">
          <FaUserCircle size={25} className="user" />
        </div>
      </HomeHeader>
      <div
        style={{
          width: '70%',
          boxShadow: '0px 1px 5px 4px #efefef',
          flexGrow: 1,
        }}
      >
        <Nav>
          <div></div>
          <div></div>
          <div
            style={{ ...Flex, width: '10vw', justifyContent: 'space-between' }}
          >
            <WriteBtn onClick={() => setIsBoardOpened(true)}>작성</WriteBtn>
            {isBoardOpened && (
              <ModalBoard modal={isBoardOpened} openModal={openModalBoard}>
                <div className="boardWriteContainer">
                  <div className="boardWriteTitle">
                    <input
                      className="boardTitleInput"
                      placeholder="제목"
                      onChange={(e) =>
                        inputBoardData('board_title', e.target.value)
                      }
                    />
                  </div>
                  <textarea
                    className="boardContent"
                    placeholder="글 내용 작성"
                    onChange={(e) =>
                      inputBoardData('board_content', e.target.value)
                    }
                  />
                  <div className="boardWriteFile">
                    <label htmlFor="file">
                      <div className="btnUpload">이미지 업로드</div>
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={(e) => getImg(e)}
                    />
                    <WriteBtn onClick={writeBoard}>작성 완료</WriteBtn>
                  </div>
                </div>
              </ModalBoard>
            )}
            <select
              name="sortValue"
              id="sortValue"
              onChange={(e) => sortingBoards(e.target.value)}
            >
              {sortValues.map((v, i) => (
                <option className="sortButton" key={i} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </Nav>
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
        {isOpened === true && (
          <Modal openModal={openModal} modal={isOpened}>
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
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        getImgs(e);
                      }
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
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Home;
