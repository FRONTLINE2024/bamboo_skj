import { SetStateAction } from 'react';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import Cookie from 'js-cookie';

// apis
import { postChatMessage } from '@/pages/api/clients/home';

// types
import { ChatDataType, ChattingDataType, messageType } from '@/types/chat';

interface usePostSendMessageType {
  currentMessage: string;
  receiverID: number;
  setCurrentMessage: React.Dispatch<SetStateAction<messageType>>;
  refetchChattingData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ChattingDataType[], Error>>;
  getMyIndividualChat: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ChatDataType[], Error>>;
}

const usePostSendMessage = ({
  currentMessage,
  setCurrentMessage,
  getMyIndividualChat,
}: usePostSendMessageType) => {
  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: async () => {
      const data = {
        chat_user_id: Number(Cookie.get('user_index')),
        chat_content: currentMessage,
        receiverID: Number(Cookie.get('id')),
      };

      const res = await postChatMessage(data);
      setCurrentMessage({ currentMessage: '', receiverID: 0 });

      console.log(res);

      return res.data;
    },
    onSuccess: () => {
      getMyIndividualChat();
    },
  });
};

export default usePostSendMessage;
