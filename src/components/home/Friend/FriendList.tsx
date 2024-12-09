import { SetStateAction } from 'react';

// apis
import { acceptFriend } from '@/pages/api/clients/home';

// styles
import { FriendRequestContainer } from '@/styles/home/styles';

// types
import { userRequestType } from '@/types/home';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface FriendListType {
  userID: number;
  friendUserID: number;
  status: number;
  getDate(createAt: string): string;
  setRequestData: React.Dispatch<SetStateAction<userRequestType>>;
  friendList: userRequestType[] | undefined;
  requestFriend: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<userRequestType[], Error>>;
}

const FriendList = ({
  userID,
  friendUserID,
  status,
  getDate,
  setRequestData,
  friendList,
  requestFriend,
}: FriendListType) => {
  // 친구 삭제
  const deleteFriendMutate = useMutation({
    mutationKey: ['deleteFriends'],
    mutationFn: async () => {
      const body = {
        userID,
        friendUserID,
        status: status === 1 && false,
      };

      const response = await acceptFriend(body);

      console.log(response);

      return response.data;
    },
    onSuccess: () => {
      requestFriend();
    },
  });

  // 친구 삭제 함수
  function acceptFunc(data: userRequestType) {
    setRequestData(data);
    deleteFriendMutate.mutate();
  }

  return (
    <div style={{ height: '70vh' }}>
      {friendList?.map((d, i) => {
        if (d.status === 1) {
          return (
            <FriendRequestContainer key={i}>
              <div className="container">
                <div className="userSection">
                  <span className="userEmail">{d.userEmail}</span>
                  <span className="createAt">{getDate(d.createAt)}</span>
                </div>

                <span className="btn" onClick={() => acceptFunc(d)}>
                  삭제
                </span>
              </div>
            </FriendRequestContainer>
          );
        }
      })}
    </div>
  );
};

export default FriendList;
