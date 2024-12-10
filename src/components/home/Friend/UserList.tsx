import { SetStateAction, useEffect } from 'react';

// apis
import { addFriends, getAllUser } from '@/pages/api/clients/home';

// styles
import { FriendRequestContainer } from '@/styles/home/styles';

// types
import { userEntireType, userRequestType } from '@/types/home';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';

interface UserListType {
  setRequestData: React.Dispatch<SetStateAction<userRequestType>>;
  friendList: userRequestType[] | undefined;
  requestFriend: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<userRequestType[], Error>>;
  friendUserID: number;
}

const UserList = ({
  setRequestData,
  friendList,
  requestFriend,
  friendUserID,
}: UserListType) => {
  // 전체 유저 가져오기
  const { data: Alldata, refetch: getEntireUser } = useQuery<userEntireType[]>({
    queryKey: ['getEntireUser'],
    queryFn: async () => {
      const response = await getAllUser();

      const myFriendIDs = friendList
        ?.filter((user) => user.userID === Number(Cookies.get('user_index')))
        .map((user) => user.friendUserID);

      const myFriendIDs2 = friendList
        ?.filter(
          (user) => user.friendUserID === Number(Cookies.get('user_index'))
        )
        .map((user) => user.userID);

      if (!myFriendIDs2) {
        return;
      }

      myFriendIDs?.push(...myFriendIDs2);

      const { data } = response;

      const removeOne = myFriendIDs?.filter(
        (id) => id !== Number(Cookies.get('user_index'))
      );

      const usersNotFriends = data.filter((d: userEntireType) => {
        return !removeOne?.includes(d.user_index);
      });

      return usersNotFriends;
    },
  });

  // 친구 요청
  const friend = useMutation({
    mutationKey: ['addFriend'],
    mutationFn: async () => {
      const response = await addFriends({
        userID: Number(Cookies.get('user_index')),
        friendUserID,
        status: false,
      });

      console.log(response);

      return response.data;
    },
    onSuccess: () => {
      console.log('Mutation successful, refetching...');
      getEntireUser();
      console.log('Mutation successful ending, refetching...');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 요청
  function acceptFunc(data: userEntireType) {
    console.log(data);
    setRequestData((prev) => ({
      ...prev,
      friendUserID: data.user_index,
    }));
    friend.mutate();
  }

  useEffect(() => {
    getEntireUser();
    requestFriend();
  }, [friendUserID]);

  return (
    <>
      {Alldata?.map((d, i) => {
        if (Number(Cookies.get('user_index')) !== d.user_index) {
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
                <span style={{ fontFamily: 'GmarketSansMedium', width: '92%' }}>
                  {d.user_nickname}
                </span>

                <span className="btn" onClick={() => acceptFunc(d)}>
                  요청
                </span>
              </div>
            </FriendRequestContainer>
          );
        }
      })}
    </>
  );
};

export default UserList;
