import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// styles
import { ModalContainer } from '../../styles/common/styles';

// icons
import { IoClose } from 'react-icons/io5';
interface ModalType {
  children: React.ReactNode;
  modal: boolean;
  openModal: () => void;
}
const ModalBoard = ({ openModal, children }: ModalType) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector(
      '#modal-container2'
    ) as HTMLElement | null;
    setModalRoot(root);
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* 모달 헤더 */}
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
        {/* 모달 컨텐츠 부분 */}
        {children}
        {/*  */}
      </div>
    </ModalContainer>,
    modalRoot
  );
};
export default ModalBoard;
