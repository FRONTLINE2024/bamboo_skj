import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import { Container } from '@/styles/styles';

// libraries
import axios from 'axios';
import Cookie from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

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
import { patchBoardData, postBoardData } from './api/clients/home';

// context
import { navContext } from '@/context/homeContext';
import useGetDateAscendData from '@/hooks/home/api/useGetDateAscendData';
import useGetDateDescendData from '@/hooks/home/api/useGetDateDescendData';
import useGetContentAscendData from '@/hooks/home/api/useGetContentAscendData';
import useGetAllData from '@/hooks/home/api/useGetAllData';
import useDeleteBoard from '@/hooks/home/api/useDeleteBoard';
import useGetSpecificBoardData from '@/hooks/home/api/useGetSpecificBoardData';
import usePostBoardWrite from '@/hooks/home/api/usePostBoardWrite';
import usePatchBoard from '@/hooks/home/api/usePatchBoard';

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
    board_img: selected.board_img,
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
      board_img: file,
    }))
  );

  // 수정 버튼 변환
  function modifyChange() {
    setBoardModify(!boardModify);
  }

  // 게시글 수정
  function PatchBoardData() {
    patchBoards();
    setBoardModify(false);
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

  // React Query
  const { refetch: refetchAllData } = useGetAllData({ setData }); // 모든 데이터 GET

  const {
    data: getSpecificData,
    refetch: refetchSpecificData,
    isSuccess,
  } = useGetSpecificBoardData({ selected }); // 특정 데이터 GET

  const { mutate: postBoard } = usePostBoardWrite({
    closeModalBoard,
    refetchAllData,
    formData,
  }); // 게시글 POST

  const { mutate: fetchAscendData } = useGetDateAscendData({ setData }); // 오래된 순

  const { mutate: fetchDescendData } = useGetDateDescendData({ setData }); // 최신 순

  const { mutate: fetchContentAscendData } = useGetContentAscendData({
    setData,
  }); // 이름 순

  const { mutate: patchBoards } = usePatchBoard({
    formPatchData,
    refetchSpecificData,
    refetchAllData,
  }); // 게시글 Patch

  const { mutate: deleteBoards } = useDeleteBoard({ refetchAllData }); // 게시글 Delete

  useEffect(() => {
    if (isSuccess) {
      setSelected(getSpecificData.data);
    }
  }, [isSuccess, getSpecificData]);

  // 게시글 post 실행 함수
  function writeBoard() {
    const createdAt = useSetDate();
    setBoardData((prev) => ({
      ...prev,
      createdAt,
    }));
    // boardWrite.mutate();
    postBoard();
  }

  // 게시글 삭제 함수
  function boardDelete(id: number) {
    deleteBoards(id);
  }

  // 오래된 순
  const getDateAscendDataFunc = () => {
    fetchAscendData();
  };

  // 최신 순
  const getDateDescendDataFunc = () => {
    fetchDescendData();
  };

  // 게시글 이름 순
  const getContentAscendDataFuncs = () => {
    fetchContentAscendData();
  };

  function sortingBoards(value: string) {
    switch (value) {
      case '최신순':
        getDateDescendDataFunc();
        break;
      case '오래된 순':
        getDateAscendDataFunc();
        break;
      case '이름순':
        getContentAscendDataFuncs();
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
