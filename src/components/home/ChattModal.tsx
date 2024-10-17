import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChattingContainer } from './styles';
import { IoClose } from 'react-icons/io5';

interface ChatModalType {
  children: React.ReactNode;
  openModal: () => void;
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
    </ChattingContainer>,
    chatRoot
  );
};

export default ChatModal;
