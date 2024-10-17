import { useEffect, useRef } from 'react';

// libraries
import Cookie from 'js-cookie';
import { ChattingDataType } from '@/types/chat';

// styles
import { ChatData } from '../styles';
import { Flex } from '@/styles/common/direction';

interface ChatType {
  chattingData: ChattingDataType[] | undefined;
}

const Chat = ({ chattingData }: ChatType) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chattingData]);

  return (
    <ChatData>
      {chattingData?.map((d, i) => {
        if (Number(Cookie.get('user_index')) === d.chat_user_id) {
          return (
            <div className="myChat" key={i}>
              <div style={{ ...Flex, alignItems: 'flex-end' }}>
                <span className="userName">{d.chat_user_nickname}</span>
                <div className="myContent">{d.chat_content}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="otherChat" key={i}>
              <div style={{ ...Flex, alignItems: 'flex-start' }}>
                <span className="otherUserName">{d.chat_user_nickname}</span>
                <div className="otherContent">{d.chat_content}</div>
              </div>
            </div>
          );
        }
      })}
      <div ref={messageEndRef}></div>
    </ChatData>
  );
};

export default Chat;
