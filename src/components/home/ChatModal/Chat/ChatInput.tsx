import { useContext } from 'react';

// icons
import { SlArrowUpCircle } from 'react-icons/sl';

// contexts
import { chatContext } from '@/context/homeContext';

interface ChatInputType {
  handleCompositionStart: () => void;
  handleCompositionEnd: () => void;
  send(e: React.KeyboardEvent<HTMLInputElement>): void;
}
const ChatInput = ({
  handleCompositionStart,
  handleCompositionEnd,
  send,
}: ChatInputType) => {
  const inputContext = useContext(chatContext);

  const { currentMessage, setCurrentMessage } = inputContext;

  return (
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
  );
};

export default ChatInput;
