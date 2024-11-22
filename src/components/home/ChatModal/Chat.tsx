import { SetStateAction, useEffect, useRef, useState } from 'react';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';

// types
import { ChatDataType, ChattingDataType, messageType } from '@/types/chat';

// styles
import { ChatData } from '../../../styles/home/components/styles';
import { Flex } from '@/styles/common/direction';

// icons
import { PiUserCircleFill } from 'react-icons/pi';
import { GrSearch } from 'react-icons/gr';
import { TbArrowBackUp } from 'react-icons/tb';
import { SlArrowUpCircle } from 'react-icons/sl';
import { useSocket } from '@/components/provider/SocketWrapper';
import axios from 'axios';

interface ChatType {
  chattingData: ChattingDataType[] | undefined;
  myChat: ChatDataType[] | undefined;
  sendMessages: UseMutateFunction<void, Error, void, unknown>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<messageType>>;
  getMyIndividualChat: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ChatDataType[], Error>>;
}

interface listType {
  id: number;
  userNickname: string;
}

const Chat = ({
  myChat,
  sendMessages,
  currentMessage,
  setCurrentMessage,
}: ChatType) => {
  // console.log('myChat: ', myChat);
  // 소켓
  const { socket } = useSocket();
  // 입력중인지 판단
  const [isComposing, setIsComposing] = useState<boolean>(false);
  // 채팅방 데이터
  const [chatData, setChatData] = useState<ChatDataType[]>([]);
  // 유저 목록
  const [chatUserList, setChatUserList] = useState<listType[]>([
    {
      id: 0,
      userNickname: '',
    },
  ]);
  // 스크롤 감지 DOM
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData]);

  function sorting() {
    const myList: listType[] = [];

    const nameList = myChat?.map((chat) => {
      const userNickname = String(chat.chat_user_nickname);
      if (!myList.some((item) => item.userNickname === userNickname)) {
        const id =
          Number(Cookies.get('user_index')) === chat.receiverID
            ? chat.senderID
            : chat.receiverID;
        myList.push({ id, userNickname });
      }
    });

    // console.log('myList: ', myList);
    setChatUserList(myList);
  }

  function processChattingRoom({ id, userNickname }: listType) {
    const thisChattingRoom = myChat?.filter((chat) => {
      if (chat.chat_user_nickname === userNickname) {
        return chat;
      }
    });
    // console.log('클릭된 채팅방 데이터: ', thisChattingRoom);
    setChatData(thisChattingRoom!);
    setCurrentMessage((prev) => ({
      ...prev,
      receiverID: id,
    }));
    Cookies.set('userNickname', userNickname);
    Cookies.set('id', String(id));
  }

  useEffect(() => {
    if (myChat) {
      const thisChattingRoom = myChat.filter((chat) => {
        return chat.chat_user_nickname === Cookies.get('userNickname');
      });

      setChatData(thisChattingRoom);
    }
  }, [myChat]);

  const handleCompositionStart = () => {
    setIsComposing(true);
    // console.log('입력 시작');
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    // console.log('입력 끝');
  };

  // async function testInput() {
  //   if (currentMessage.trim()) {
  //     try {
  //       const data = {
  //         chat_user_id: Number(Cookies.get('user_index')),
  //         chat_content: currentMessage,
  //         receiverID: Number(Cookies.get('id')),
  //       };
  //       const response = await axios.post('/api/chat', data);

  //       console.log('test input success', response);

  //       if (response.status === 200) {
  //         setCurrentMessage({ currentMessage: '', receiverID: 0 });
  //       }
  //     } catch (e) {
  //       console.log('test input error', e);
  //     }
  //   }
  // }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      sendMessages();
    }
  };

  function send(e: React.KeyboardEvent<HTMLInputElement>) {
    handleKeyDown(e);
  }

  useEffect(() => {
    sorting();
  }, [myChat]);

  useEffect(() => {
    if (!socket) {
      console.warn('No socket connection');
      return;
    }

    console.log('Setting up socket listeners');

    socket.on('message', (message: ChatDataType[]) => {
      console.log('Message received:', message);
      setChatData((prev) => [...prev, message[0]]);
    });

    // Cleanup
    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('message');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <ChatData>
      {chatData.length > 0 && (
        <div style={{ position: 'sticky' }}>
          <TbArrowBackUp
            size={20}
            style={{
              position: 'fixed',
              top: '1px',
              cursor: 'pointer',
              zIndex: 999,
            }}
            onClick={() => setChatData([])}
          />
        </div>
      )}
      {chatData.length === 0 && (
        <header style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <input className="chatUserSearchBar" />
          <GrSearch size={20} />
        </header>
      )}

      {chatData.length > 0
        ? chatData?.map((d, i) => (
            <div key={i}>
              {Number(Cookies.get('user_index')) === d.chat_user_id ? (
                <div className="myChat">
                  <div style={{ ...Flex, alignItems: 'flex-end' }}>
                    <span className="userName">{d.chat_user_nickname}</span>
                    <div className="myContent">{d.chat_content}</div>
                  </div>
                </div>
              ) : (
                <div className="otherChat">
                  <div style={{ ...Flex, alignItems: 'flex-start' }}>
                    <span className="otherUserName">
                      {d.chat_user_nickname}
                    </span>
                    <div className="otherContent">{d.chat_content}</div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>
          ))
        : chatUserList?.map((user, i) => {
            return (
              <div
                key={i}
                className="chatList"
                style={{
                  ...Flex,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '5px',
                  fontFamily: 'GmarketSansMedium',
                }}
                onClick={() => processChattingRoom(user)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PiUserCircleFill size={30} color="#e1e1e1" />
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '10px',
                  }}
                >
                  {user.userNickname}
                </div>
                <div> </div>
              </div>
            );
          })}
      {chatData.length > 0 && (
        <div className="footer">
          <input
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={(e) => send(e)}
            placeholder="메세지 입력"
            value={currentMessage}
            onChange={(e) =>
              setCurrentMessage((prev) => ({
                ...prev,
                currentMessage: e.target.value,
              }))
            }
          />
          <SlArrowUpCircle size={25} />
        </div>
      )}
    </ChatData>
  );
};

export default Chat;
