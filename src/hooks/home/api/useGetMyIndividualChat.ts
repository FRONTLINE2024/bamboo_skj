// apis
import { getMyChat } from '@/pages/api/clients/home';

// types
import { ChatDataType } from '@/types/chat';

// libraries
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const useGetMyIndividualChat = () => {
  return useQuery<ChatDataType[]>({
    queryKey: ['getMyIndividualChat'],
    queryFn: async () => {
      const chat_user_id = Number(Cookies.get('user_index'));
      const response = await getMyChat(chat_user_id);

      console.log(response);
      return response.data;
    },
  });
};

export default useGetMyIndividualChat;
