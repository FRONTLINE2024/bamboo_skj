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
  friendUserID: number;
  status: number;
  setRequestData: React.Dispatch<SetStateAction<userRequestType>>;
  friendList: userRequestType[] | undefined;
}

const UserList = ({
  userID,
  friendUserID,
  status,
  setRequestData,
  friendList,
}: UserListType) => {
  // 친구 요청
  const { mutate: request } = useMutation({
    mutationKey: ['postFriendRequest'],
    mutationFn: async () => {
      const body = {
        userID,
        friendUserID,
        status: status === 0 && true,
      };
      const response = await acceptFriend(body);

      console.log(response);
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

      const { data } = response;

      const usersNotFriends = data.filter((d: userEntireType) => {
        return !myFriendIDs?.includes(d.user_index);
      });

      console.log('Users not in friend list: ', usersNotFriends);

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
