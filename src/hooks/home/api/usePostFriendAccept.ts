import { acceptFriend } from '@/pages/api/clients/home';
import { userRequestType } from '@/types/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface usePostFriendAcceptType {
  requestFriend: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<userRequestType[], Error>>;
  userID: number;
  friendUserID: number;
  status: number;
}

const usePostFriendAccept = ({
  requestFriend,
  userID,
  friendUserID,
  status,
}: usePostFriendAcceptType) => {
  return useMutation({
    mutationKey: ['postFriendAccept'],
    mutationFn: async () => {
      const body = {
        userID,
        friendUserID,
        status: status === 0 && true,
      };
      const response = await acceptFriend(body);

      console.log(response);
    },
    onSuccess: () => {
      requestFriend();
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default usePostFriendAccept;
