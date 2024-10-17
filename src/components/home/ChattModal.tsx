import React, { SetStateAction, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChattingContainer } from './styles';
import { IoClose } from 'react-icons/io5';
import { UseMutateFunction } from '@tanstack/react-query';

interface ChatModalType {
  children: React.ReactNode;
  openModal: () => void;
  sendMessages: UseMutateFunction<void, Error, void, unknown>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<string>>;
}

const ChatModal = ({
  children,
  openModal,
  sendMessages,
  currentMessage,
  setCurrentMessage,
}: ChatModalType) => {
  const [chatRoot, setChatRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector('#modal-chat') as HTMLElement | null;
    setChatRoot(root);
  }, []);

  if (!chatRoot) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄 바꿈을 방지
      sendMessages();
    }
  };

  return ReactDOM.createPortal(
    <ChattingContainer>
      <div className="modalHeader">
        <div onClick={openModal}>
          <IoClose
            style={{
              marginRight: '0.4rem',
              width: '20',
              height: '20',
              cursor: 'pointer',
              color: 'white',
            }}
          />
        </div>
      </div>
      {children}
      <div className="footer">
        <textarea
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="채팅 예시"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
      </div>
    </ChattingContainer>,
    chatRoot
  );
};

export default ChatModal;
