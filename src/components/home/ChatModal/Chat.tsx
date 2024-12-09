import { SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useQuery,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';

// types
import { ChatDataType, messageType } from '@/types/chat';

// styles
import { ChatData } from '../../../styles/home/components/styles';

// icons
import { GrSearch } from 'react-icons/gr';
import { TbArrowBackUp } from 'react-icons/tb';

// components
import ChatInput from './Chat/ChatInput';
import ChatUserList from './Chat/ChatUserList';
import ChatContent from './Chat/ChatContent';

// constants
import { universities } from '@/constants/universities';

// apis
import { getMyFriendRequest } from '@/pages/api/clients/home';

// types
import { userRequestType } from '@/types/home';

// contexts
import { useSocket } from '@/components/provider/SocketWrapper';

interface ChatType {
  myChat: ChatDataType[] | undefined;
  sendMessages: UseMutateFunction<void, Error, void, unknown>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<messageType>>;
  getMyIndividualChat: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ChatDataType[], Error>>;
}

export interface listType {
  id: number;
  userNickname: string;
  university: string;
}

const Chat = ({
  myChat,
  sendMessages,
  currentMessage,
  setCurrentMessage,
}: ChatType) => {
  // 소켓
  const { socket } = useSocket();
  // 입력중인지 판단
  const [isComposing, setIsComposing] = useState<boolean>(false);
  // 채팅방 데이터
  const [chatData, setChatData] = useState<ChatDataType[]>([
    {
      user_id: '',
      chat_content: '',
      chat_id: 0,
      chat_user_id: 0,
      createAt: '',
      receiverID: 0,
      senderID: 0,
      chat_user_nickname: '',
      university: '',
    },
  ]);

  // 유저 목록
  const [chatUserList, setChatUserList] = useState<listType[]>([
    {
      id: 0,
      userNickname: '',
      university: '',
    },
  ]);

  // 스크롤 감지 DOM
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData]);

  const { data: getMyFriendsData } = useQuery<userRequestType[]>({
    queryKey: ['getMyChat', Number(Cookies.get('user_index'))],
    queryFn: async () => {
      const response = await getMyFriendRequest(
        Number(Cookies.get('user_index'))
      );
      return response.data;
    },
  });

  useEffect(() => {
    console.log(getMyFriendsData!);
  }, [getMyFriendsData]);

  function sorting() {
    const myList: listType[] = [];

    if (getMyFriendsData) {
      const data = getMyFriendsData?.filter((data) => data.status === 1);

      // console.log('데이터 제대로 분리 되었음 : ', data[0]);
      // console.log('데이터 비교: ', myChat![0]);

      data?.map((chat) => {
        const userNickname = String(chat.userEmail);
        if (!myList.some((item) => item.userNickname === userNickname)) {
          const id =
            Number(Cookies.get('user_index')) === chat.friendUserID
              ? chat.userID
              : chat.friendUserID;
          myList.push({ id, userNickname, university: chat.university });
        }
      });
    }

    setChatUserList(myList);
  }

  function processChattingRoom({ id, userNickname }: listType) {
    const thisChattingRoom = myChat?.filter((chat) => {
      if (chat.chat_user_nickname === userNickname) {
        return chat;
      }
    });

    if (thisChattingRoom?.length! > 0) {
      setChatData(thisChattingRoom!);
    } else {
      setChatData([
        {
          user_id: '',
          chat_content: '',
          chat_id: 0,
          chat_user_id: 0,
          createAt: '',
          receiverID: 0,
          senderID: 0,
          chat_user_nickname: '',
          university: '',
        },
      ]);
    }

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
  }, [myChat, getMyFriendsData]);

  useEffect(() => {
    if (!socket) {
      console.warn('No socket connection');
      return;
    }

    socket.on('message', (message: ChatDataType[]) => {
      // console.log('Message received:', message);
      setChatData((prev) => [...prev, message[0]]);
    });

    return () => {
      socket.off('message');
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function sortingLogo(universityName: string) {
    if (universityName) {
      const logo = universities.filter(
        (university) => university.name === universityName
      );

      return (
        <Image
          src={logo[0].img.src}
          alt="대학교로고"
          width={25}
          height={25}
          style={{ objectFit: 'contain' }}
        />
      );
    }
  }

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

      {chatData.length > 0 ? (
        chatData[0].chat_content.length > 0 && (
          <ChatContent chatData={chatData} messageEndRef={messageEndRef} />
        )
      ) : (
        <ChatUserList
          chatUserList={chatUserList}
          processChattingRoom={processChattingRoom}
          sortingLogo={sortingLogo}
        />
      )}

      {chatData.length > 0 && (
        <ChatInput
          handleCompositionStart={handleCompositionStart}
          handleCompositionEnd={handleCompositionEnd}
          send={send}
        />
      )}
    </ChatData>
  );
};

export default Chat;
