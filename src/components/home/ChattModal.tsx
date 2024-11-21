import React, { SetStateAction, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChattingContainer } from './styles';
import { IoClose } from 'react-icons/io5';
import { UseMutateFunction } from '@tanstack/react-query';
import { messageType } from '@/types/chat';

interface ChatModalType {
  children: React.ReactNode;
  openModal: () => void;
  sendMessages: UseMutateFunction<void, Error, void, unknown>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<messageType>>;
}

const ChatModal = ({ children, openModal, sendMessages }: ChatModalType) => {
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
              marginRight: '0.2rem',
              width: '20',
              height: '20',
              cursor: 'pointer',
              color: '#101010',
            }}
          />
        </div>
      </div>
      {children}
    </ChattingContainer>,
    chatRoot
  );
};

export default ChatModal;
