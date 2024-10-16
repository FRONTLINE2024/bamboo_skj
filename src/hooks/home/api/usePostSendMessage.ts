// libraries
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'js-cookie';
import { SetStateAction } from 'react';

interface usePostSendMessageType {
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<string>>;
}

const usePostSendMessage = ({
  currentMessage,
  setCurrentMessage,
}: usePostSendMessageType) => {
  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: async () => {
      const res = await axios.post('/api/chat', {
        chat_user_id: Cookie.get('user_index'),
        chat_content: currentMessage,
      });
      setCurrentMessage('');

      console.log(res);
    },
  });
};

export default usePostSendMessage;
