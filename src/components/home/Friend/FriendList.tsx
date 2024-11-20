// apis
import useGetFriendRequest from '@/hooks/home/api/useGetFriendRequest';
import {
  acceptFriend,
  addFriends,
  deleteFriendss,
} from '@/pages/api/clients/home';

// styles
import { FriendRequestContainer } from '@/styles/home/styles';
import { userRequestType } from '@/types/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { SetStateAction, useEffect } from 'react';

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
              <div
                style={{
                  display: 'flex',
                  height: '70px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottom: '1px solid #d2d2d1',
                  padding: '7px',
                }}
              >
                <div
                  style={{
                    width: '92%',
                    height: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontFamily: 'GmarketSansMedium' }}>
                    {d.userEmail}
                  </span>
                  <span style={{ fontFamily: 'GmarketSansLight' }}>
                    {getDate(d.createAt)}
                  </span>
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
