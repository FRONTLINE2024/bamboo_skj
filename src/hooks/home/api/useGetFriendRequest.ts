import { getMyFriendRequest } from '@/pages/api/clients/home';
import { userRequestType } from '@/types/home';
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const useGetFriendRequest = () => {
  return useQuery<userRequestType[]>({
    queryKey: ['getMyChat'],
    queryFn: async () => {
      const userID = Number(Cookies.get('user_index'));
      // const response = await getMyChat(chat_user_id);
      const response = await getMyFriendRequest(userID);

      console.log(response);

      return response.data;
    },
  });
};

export default useGetFriendRequest;
