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
  const [isComposing, setIsComposing] = useState<boolean>(false);

  useEffect(() => {
    const root = document.querySelector('#modal-chat') as HTMLElement | null;
    setChatRoot(root);
  }, []);

  if (!chatRoot) return null;

  const handleCompositionStart = () => {
    setIsComposing(true);
    console.log('입력 시작');
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    console.log('입력 끝');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // console.log(`Key pressed: ${e.key}, Composing: ${isComposing}`);
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      // console.log('Sending message');
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
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
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
