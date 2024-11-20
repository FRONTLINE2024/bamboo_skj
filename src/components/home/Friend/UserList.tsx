// apis
import useGetFriendRequest from '@/hooks/home/api/useGetFriendRequest';
import usePostFriendAccept from '@/hooks/home/api/usePostFriendAccept';
import {
  acceptFriend,
  getAllUser,
  getMyFriendRequest,
} from '@/pages/api/clients/home';
import { FriendRequestContainer } from '@/styles/home/styles';
import { userEntireType, userRequestType } from '@/types/home';
// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { SetStateAction, useEffect } from 'react';

interface UserListType {
  userID: number;
  setRequestData: React.Dispatch<SetStateAction<userRequestType>>;
  friendList: userRequestType[] | undefined;
}

const UserList = ({ userID, setRequestData, friendList }: UserListType) => {
  // 친구 요청
  const { mutate: request } = useMutation({
    mutationKey: ['postFriendRequest'],
    mutationFn: async () => {
      const response = await getMyFriendRequest(userID);

      console.log(response);

      return response.data;
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 전체 유저 가져오기
  const getEntireUser = useQuery<userEntireType[]>({
    queryKey: ['getEntireUser'],
    queryFn: async () => {
      const response = await getAllUser();

      const myFriendIDs = friendList
        ?.filter((user) => user.status === 1)
        .map((user) => user.userID);

      const myFriendIDs2 = friendList
        ?.filter((user) => user.status === 1)
        .map((user) => user.friendUserID);

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

      // console.log('Users not in friend list: ', usersNotFriends);

      return usersNotFriends;
    },
  });

  // 요청
  function acceptFunc(data: userEntireType) {
    console.log(data);
    setRequestData((prev) => ({
      ...prev,
      friendUserID: data.user_index,
    }));
    request();
  }

  useEffect(() => {
    getEntireUser.refetch();
  }, []);

  return (
    <>
      {getEntireUser.data?.map((d, i) => {
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
