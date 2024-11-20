import { getMyFriendRequest } from '@/pages/api/clients/home';
import { userRequestType } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

interface useGetFriendRequestType {
  userID: number;
}

const useGetFriendRequest = ({ userID }: useGetFriendRequestType) => {
  return useQuery<userRequestType[]>({
    queryKey: ['getMyChat'],
    queryFn: async () => {
      const response = await getMyFriendRequest(userID);

      // console.log(response);

      return response.data;
    },
  });
};

export default useGetFriendRequest;
