import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from './styles';

interface ToastType {
  children: React.ReactNode;
  stateCode: string;
}

const messageIcon = {
  error: '❌',
  correct: '✅',
};

const Toast = ({ children, stateCode }: ToastType) => {
  console.log(stateCode);
  const [toastRoot, setToastRoot] = useState<HTMLElement | null>(null);
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    const firstChar = stateCode.charAt(0);
    if (firstChar === '4') {
      console.log('Error case handled');
      setIcon(messageIcon.error);
    } else if (firstChar === '2') {
      console.log('Correct case handled');
      setIcon(messageIcon.correct);
    }
  }, [stateCode]);

  useEffect(() => {
    const root = document.querySelector('#toast_message') as HTMLElement | null;
    setToastRoot(root);
  }, []);

  if (!toastRoot) return null;

  return ReactDOM.createPortal(
    <ToastContainer>
      <span>{icon}</span>
      {children}
    </ToastContainer>,
    toastRoot
  );
};

export default Toast;
