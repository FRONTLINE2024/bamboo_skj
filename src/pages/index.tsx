import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import { Container } from '@/styles/styles';

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
import Header from '@/components/home/Header';
import NavBar from '@/components/home/NavBar';
import MainContent from '@/components/home/MainContent';
import BoardInfo from '@/components/home/BoardInfo';

// hooks
import useModalOpen, { useModalOpenType } from '@/hooks/home/useModalOpen';
import { useSocket } from '@/components/provider/SocketWrapper';
import useFormData from '@/hooks/home/useFormData';
import useFileInput from '@/hooks/home/useGetImg';
import useSetDate from '@/hooks/home/useSetDate';

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

// context
import { navContext } from '@/context/homeContext';

const Home = () => {
  // 라우터
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

  // FormData 생성
  const formData = useFormData({
    board_title,
    board_content,
    board_user_id: `${Cookie.get('user_index')}`,
    createdAt,
    board_img,
  });

  // hook을 통해 FormData 생성
  const formPatchData = useFormData({
    id: `${selected.id}`,
    board_title: selected.board_title,
    board_content: selected.board_content,
    board_user_id: `${Cookie.get('user_index')}`,
    createdAt: selected.createdAt,
    board_img: selected.board_img, // 필요한 데이터 포함
  });

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

  // 게시글 저장
  const boardWrite = useMutation({
    mutationKey: ['boardWrite'],
    mutationFn: async () => {
      const response = await postBoardData(formData);
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
    const createdAt = useSetDate();
    setBoardData((prev) => ({
      ...prev,
      createdAt,
    }));
    boardWrite.mutate();
  }

  // 이미지 가져오는 함수
  const handleBoardImg = useFileInput((file) =>
    setBoardData((prev) => ({
      ...prev,
      board_img: file,
    }))
  );

  // 게시글 이미지 get
  const handleSelectedImg = useFileInput((file) =>
    setSelected((prev) => ({
      ...prev,
      board_img: file, // Blob 타입을 사용
    }))
  );

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
      return response.data;
    },
    enabled: false, // 기본적으로 비활성화하여 자동 실행을 막음
  });

  useEffect(() => {
    if (getSpecificBoardData.isSuccess) {
      setSelected(getSpecificBoardData.data.data);
    }
  }, [getSpecificBoardData.isSuccess, getSpecificBoardData.data]);

  // 게시글 수정
  const patchBoard = useMutation({
    mutationKey: ['patchBoard'],
    mutationFn: async () => {
      const response = await patchBoardData(formPatchData);
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
      const body = {
        data: { id, board_user_id },
      };
      const response = await deleteBoardData(body);
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
      return response.data;
    },
    onSuccess: (data) => {
      setData(data.data);
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
      return response.data;
    },
    onSuccess: (data) => {
      setData(data.data);
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
      return response.data;
    },
    onSuccess: (data) => {
      setData(data.data);
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

  return (
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
      <Header />
      <div
        style={{
          width: '70%',
          boxShadow: '0px 1px 5px 4px #efefef',
          flexGrow: 1,
        }}
      >
        <navContext.Provider
          value={{
            isBoardOpened,
            setIsBoardOpened,
            openModalBoard,
            inputBoardData,
            writeBoard,
            sortingBoards,
            handleBoardImg,
            sortValues,
          }}
        >
          <NavBar />
        </navContext.Provider>
        <MainContent
          data={data}
          getSelectedData={getSelectedData}
          boardDelete={boardDelete}
        />
        {isOpened === true && (
          <Modal openModal={openModal} modal={isOpened}>
            <BoardInfo
              selected={selected}
              boardModify={boardModify}
              inputSelectedBoardData={inputSelectedBoardData}
              handleImageClick={handleImageClick}
              handleSelectedImg={handleSelectedImg}
              fileInputRef={fileInputRef}
              PatchBoardData={PatchBoardData}
              modifyChange={modifyChange}
            />
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Home;
