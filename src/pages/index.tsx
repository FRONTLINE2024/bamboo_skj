import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// styles
import { Container, HomeHeader, HomeInput, Main, Nav } from '@/styles/styles';

// icons
import { IoSearch } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

// libraries
import axios from 'axios';
import Cookie from 'js-cookie';

// types
import { BoardType } from '@/types/home';
import { IMessage } from '@/types/chat';

//constants
import { sortValues } from '@/constants/boardSortingValue';
import { useRecoilState } from 'recoil';
import { selectedPost } from '@/atom/state';

// compnents
import Modal from '@/components/common/Modal';

// hooks
import useModalOpen, { useModalOpenType } from '@/hooks/useModalOpen';
import { useSocket } from '@/components/provider/SocketWrapper';

// img
import TestImg from '@/assets/images/campus.jpg';

const Home = () => {
  //
  const router = useRouter();

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

  const { socket } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const [selected, setSelected] = useRecoilState<BoardType>(selectedPost);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [data, setData] = useState<BoardType[]>([
    {
      id: 0,
      board_title: '',
      board_content: '',
      board_user_id: '',
      board_img: '',
      createAt: '',
    },
  ]);

  function getSelectedData(data: BoardType) {
    setSelected(data);
    setIsOpened(true);
  }

  function openModal() {
    const object: useModalOpenType = {
      isOpened,
      setIsOpened,
    };
    const execute = useModalOpen(object);
    execute();
  }

  function closeModal() {
    setIsOpened(false);
  }

  async function getData() {
    try {
      const response = await axios.get('/api/board');
      console.log(response);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getDateAscendData() {
    try {
      const response = await axios.get('/api/board/sort/date_ascend');
      // console.log('date_ascend: ', response);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getDateDescendData() {
    try {
      const response = await axios.get('/api/board/sort/date_descend');
      // console.log('date_descend: ', response);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getContentAscendData() {
    try {
      const response = await axios.get('/api/board/sort/content_ascend');
      // console.log('content_ascend: ', response);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function sortingBoards(value: string) {
    switch (value) {
      case '최신순':
        getDateDescendData();
        break;
      case '오래된 순':
        getDateAscendData();
        break;
      case '이름순':
        getContentAscendData();
        break;
    }
  }

  // sendMessages
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

  useEffect(() => {
    getData();
  }, [selected.board_img]);

  // 토큰 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (Cookie.get('token') === undefined) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    console.log('data: ', selected);
    console.log('currentMessage: ', currentMessage);
    console.log('messages: ', messages);
  }, [data, currentMessage, messages]);

  return (
    // <h1>Home</h1>
    <Container>
      <div id="modal-container"></div>
      {isOpened && (
        <div className="background" onClick={closeModal}>
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
          <div>
            {/* <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.currentTarget.files?.[0] || null; // 파일 또는 null
                if (file) {
                  setSelected({
                    ...selected,
                    board_img: file, // Blob 타입을 사용
                  });
                }
              }}
            /> */}
            {/* <input onChange={(e) => setCurrentMessage(e.target.value)} />{' '}
            <button onClick={sendMessage}>클릭</button>
            {messages.map((message, i) => (
              <div key={i}>{message.content}</div>
            ))} */}
          </div>
          <div></div>
          <div></div>
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
                    <span className="boardCreateAt">{d.createAt}</span>
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
              </div>
            </div>
          ))}
        </Main>
        {isOpened === true && (
          <Modal openModal={openModal} modal={isOpened}>
            <div style={{ padding: '10px' }}>
              <div className="publisher">{selected.id}</div>
              <div className="date">{selected.createAt}</div>
              <div className="row">
                <div className="content">{selected.board_content}</div>

                {typeof selected.board_img === 'string' && (
                  <Image
                    src={selected.board_img}
                    style={{ borderRadius: '5px' }}
                    alt="이미지"
                    width={200}
                    height={200}
                    unoptimized={true}
                  />
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Home;
