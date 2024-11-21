// apis
import { getMyFriendRequest } from '@/pages/api/clients/home';

// types
import { userRequestType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const useGetFriendRequest = () => {
  return useQuery<userRequestType[]>({
    queryKey: ['getMyChat'],
    queryFn: async () => {
      const userID = Number(Cookies.get('user_index'));
      const response = await getMyFriendRequest(userID);

      // console.log(response);

      return response.data;
    },
    enabled: true,
  });
};

export default useGetFriendRequest;
