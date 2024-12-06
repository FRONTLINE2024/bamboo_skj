import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import { Container } from '@/styles/styles';

// libraries
import Cookie from 'js-cookie';

// types
import { BoardDataType, BoardType } from '@/types/home';
import { messageType } from '@/types/chat';

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
import ChatModal from '@/components/home/ChattModal';
import Chat from '@/components/home/ChatModal/Chat';
import Friend from '@/components/home/Friend';

// hooks
import useModalOpen, { useModalOpenType } from '@/hooks/home/useModalOpen';
import useFormData from '@/hooks/home/useFormData';
import useFileInput from '@/hooks/home/useGetImg';
import useSetDate from '@/hooks/home/useSetDate';

// apis
import useGetAllData from '@/hooks/home/api/useGetAllData';
import useDeleteBoard from '@/hooks/home/api/useDeleteBoard';
import useGetSpecificBoardData from '@/hooks/home/api/useGetSpecificBoardData';
import usePostBoardWrite from '@/hooks/home/api/usePostBoardWrite';
import usePatchBoard from '@/hooks/home/api/usePatchBoard';
import usePostSendMessage from '@/hooks/home/api/usePostSendMessage';
import useGetChattingData from '@/hooks/home/api/useGetChattingData';
import useInfiniteScroll from '@/hooks/home/api/useInfiniteScroll';
import useGetInfiniteScroll from '@/hooks/home/api/useGetInfiniteScroll';
import useGetMyIndividualChat from '@/hooks/home/api/useGetMyIndividualChat';

// context
import { chatContext, navContext, boardContext } from '@/context/homeContext';

// icons
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import useGetScrollData from '@/hooks/home/api/useGetScrollData';

const Home = () => {
  // 라우터
  const router = useRouter();
  // 채팅
  const [message, setCurrentMessage] = useState<messageType>({
    currentMessage: '',
    receiverID: 0,
  });

  const { currentMessage, receiverID } = message;
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
  const [, setData] = useState<BoardType[]>([
    {
      id: 0,
      user_nickname: '',
      board_title: '',
      board_content: '',
      board_user_id: '',
      board_img: '',
      createdAt: '',
      university: '',
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
  // chat modal boolean
  const [chattingModalBoolean, setChattingModalBoolean] =
    useState<boolean>(false);
  // dropdown boolean
  const [dropdownBoolean, setDropdownBoolean] = useState<boolean>(false);
  // 무한 스크롤 게시글 데이터
  const [infiniteBoardData, setInfiniteBoardData] = useState<BoardType[]>([
    {
      id: 0,
      user_nickname: '',
      board_title: '',
      board_content: '',
      board_user_id: '',
      board_img: '',
      createdAt: '',
      university: '',
    },
  ]);
  // 무한 페이지 컨트롤
  const [currentPage, setCurrentPage] = useState<number>(0);
  // 삭제되는 게시글 아이디
  const [deleteBoardId, setDeleteBoardId] = useState<number>(0);
  // 초기화 플래그
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [friendRequestModal, setFriendRequestModal] = useState<boolean>(false);

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

  // React Query
  const { refetch: refetchAllData } = useGetAllData({
    setData,
  }); // 모든 데이터 GET

  const {
    data: getSpecificData,
    refetch: refetchSpecificData,
    isSuccess: specificDataSuccess,
  } = useGetSpecificBoardData({ selected }); // 특정 데이터 GET

  const { mutate: getPagingBoard, isSuccess: successScrollData } =
    useInfiniteScroll({
      setInfiniteBoardData,
      currentPage,
    }); // 무한 스크롤 데이터 GET

  useEffect(() => {
    if (successScrollData && isInitialized) {
      setCurrentPage((prev) => prev + 1);
      const currentOffset = (currentPage + 1) * 10;
      localStorage.setItem('limit', `${currentOffset}`);
    } else {
      setIsInitialized(true);
    }
  }, [successScrollData, isInitialized]);

  const { data: InfiniteScrollData, mutate: getPagingBoardDelete } =
    useGetInfiniteScroll({
      setInfiniteBoardData,
      deleteBoardId,
    }); // 삭제 시 무한 스크롤 데이터 GET

  const { mutate: getPagingData } = useGetScrollData({ setInfiniteBoardData });

  useEffect(() => {
    getPagingBoard();
    localStorage.setItem('limit', '10');
  }, []);

  const { refetch: refetchChattingData } = useGetChattingData(); // 채팅 GET

  const { data: myChat, refetch: getMyIndividualChat } =
    useGetMyIndividualChat(); // 1대1 채팅방 데이터 GET

  const { mutate: postBoard } = usePostBoardWrite({
    closeModalBoard,
    refetchAllData,
    formData,
  }); // 게시글 POST

  const { mutate: sendMessages } = usePostSendMessage({
    currentMessage,
    receiverID,
    setCurrentMessage,
    refetchChattingData,
    getMyIndividualChat,
  }); // 채팅 메세지 보내기

  // // 정렬
  // const { mutate: fetchAscendData } = useGetDateAscendData({
  //   setInfiniteBoardData,
  // }); // 오래된 순

  // const { mutate: fetchDescendData } = useGetDateDescendData({
  //   setInfiniteBoardData,
  // }); // 최신 순

  // const { mutate: fetchContentAscendData } = useGetContentAscendData({
  //   setInfiniteBoardData,
  // }); // 이름 순

  const { mutate: patchBoards } = usePatchBoard({
    formPatchData,
    refetchSpecificData,
    getPagingData,
  }); // 게시글 Patch

  const { mutate: deleteBoards } = useDeleteBoard({
    refetchAllData,
    getPagingBoardDelete,
  }); // 게시글 Delete

  useEffect(() => {
    if (specificDataSuccess) {
      setSelected(getSpecificData.data);
    }
  }, [specificDataSuccess, getSpecificData]);

  // 헤더 드롭다운
  const handleDropdown = () => setDropdownBoolean(!dropdownBoolean);
  // 채팅 모달
  const handleChatModal = () => setChattingModalBoolean(!chattingModalBoolean);
  // 친구창
  const handleFriendModal = () => setFriendRequestModal(!friendRequestModal);

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

  // 게시글 작성 모달 닫기
  function closeModalChat() {
    setChattingModalBoolean(false);
  }

  // 친구창 모달 닫기
  function closeFriendModal() {
    setFriendRequestModal(false);
  }

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const execute = useModalOpen(object);
    execute();
  }

  // 게시글 post 실행 함수
  function writeBoard() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const createdAt = useSetDate();
    setBoardData((prev) => ({
      ...prev,
      createdAt,
    }));
    postBoard();
  }

  // 게시글 삭제 함수
  function boardDelete(id: number) {
    deleteBoards(id);
    //setState 함수
    setDeleteBoardId(id);
  }

  function sortingBoards(value: string) {
    let sorting;

    switch (value) {
      case '최신순':
        sorting = [...infiniteBoardData].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setInfiniteBoardData(sorting);
        break;
      case '오래된 순':
        sorting = [...infiniteBoardData].sort((a, b) =>
          a.createdAt.localeCompare(b.createdAt)
        );
        setInfiniteBoardData(sorting);
        break;
      case '이름순':
        sorting = [...infiniteBoardData].sort((a, b) =>
          a.board_title.localeCompare(b.board_title)
        );
        setInfiniteBoardData(sorting);
        break;
      default:
        break; // 기본값 추가
    }
  }

  useEffect(() => {
    const token = Cookie.get('accessToken');
    if (!token) {
      router.replace('/login');
    }
  }, []);

  const modalStates = [
    { isOpen: isOpened, close: closeModal },
    { isOpen: isBoardOpened, close: closeModalBoard },
    { isOpen: chattingModalBoolean, close: closeModalChat },
    { isOpen: friendRequestModal, close: closeFriendModal },
  ];

  useEffect(() => {
    console.log('선택된 게시글 데이터: ', infiniteBoardData);
  }, [infiniteBoardData]);

  return (
    <Container>
      <div id="modal-container"></div>
      <div id="modal-container2"></div>
      <div id="modal-chat"></div>
      {modalStates.map((modal, index) =>
        modal.isOpen ? (
          <div key={index} className="background" onClick={modal.close}></div>
        ) : null
      )}
      <Header
        handleDropdown={handleDropdown}
        dropdownBoolean={dropdownBoolean}
        handleFriendModal={handleFriendModal}
      />
      {friendRequestModal && (
        <Modal
          width={50}
          height={70}
          openModal={handleFriendModal}
          modal={friendRequestModal}
        >
          <Friend />
        </Modal>
      )}

      <div
        style={{
          width: '70%',
          boxShadow: '0px 1px 5px 4px #efefef',
          flexGrow: 1,
        }}
      >
        <navContext.Provider
          value={{
            inputBoardData,
            writeBoard,
            handleBoardImg,
            sortingBoards,
            sortValues,
          }}
        >
          <NavBar
            setIsBoardOpened={setIsBoardOpened}
            isBoardOpened={isBoardOpened}
            openModalBoard={openModalBoard}
          />
        </navContext.Provider>
        <MainContent
          data={infiniteBoardData}
          getSelectedData={getSelectedData}
          boardDelete={boardDelete}
          getPagingBoard={getPagingBoard}
        />
        {isOpened && (
          <Modal width={50} height={75} openModal={openModal} modal={isOpened}>
            <boardContext.Provider
              value={{
                inputSelectedBoardData,
                selected,
                boardModify,
                handleImageClick,
                fileInputRef,
                PatchBoardData,
                modifyChange,
              }}
            >
              <BoardInfo handleSelectedImg={handleSelectedImg} />
            </boardContext.Provider>
          </Modal>
        )}
      </div>

      <div className="chatSpinner" onClick={handleChatModal}>
        <IoChatbubbleEllipsesOutline />
      </div>

      {chattingModalBoolean && (
        <ChatModal
          openModal={handleChatModal}
          sendMessages={sendMessages}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        >
          <chatContext.Provider value={{ currentMessage, setCurrentMessage }}>
            <Chat
              myChat={myChat}
              sendMessages={sendMessages}
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              getMyIndividualChat={getMyIndividualChat}
            />
          </chatContext.Provider>
        </ChatModal>
      )}
    </Container>
  );
};

export default Home;
