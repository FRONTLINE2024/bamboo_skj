import React, { SetStateAction, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// styles
import { ChattingContainer } from '../../styles/home/components/styles';

// icons
import { IoClose } from 'react-icons/io5';

// libraries
import { UseMutateFunction } from '@tanstack/react-query';

// types
import { messageType } from '@/types/chat';

interface ChatModalType {
  children: React.ReactNode;
  openModal: () => void;
  sendMessages: UseMutateFunction<void, Error, void, unknown>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<messageType>>;
}

const ChatModal = ({ children, openModal }: ChatModalType) => {
  const [chatRoot, setChatRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector('#modal-chat') as HTMLElement | null;
    setChatRoot(root);
  }, []);

  if (!chatRoot) return null;

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
