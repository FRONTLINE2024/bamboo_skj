import { useState } from 'react';
// apis
import usePostFriendAccept from '@/hooks/home/api/usePostFriendAccept';

// styles
import { FriendRequestContainer } from '@/styles/home/styles';

// types
import { userRequestType } from '@/types/home';

// libraries
import Cookies from 'js-cookie';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface FriendRequestType {
  friendList: userRequestType[] | undefined;
  requestFriend: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<userRequestType[], Error>>;
}

const FriendRequest = ({ friendList, requestFriend }: FriendRequestType) => {
  // 친구 요청 데이터
  const [requestData, setRequestData] = useState<userRequestType>({
    createAt: '',
    friendUserID: 0,
    id: 0,
    status: 0,
    userID: 0,
    userEmail: '',
  });
  const { userID, friendUserID, status } = requestData;

  // 친구 요청
  // const { data: friendList, refetch: requestFriend } = useGetFriendRequest();

  // 친구 수락
  const { mutate: acceptFriend } = usePostFriendAccept({
    requestFriend,
    userID,
    friendUserID,
    status,
  });

  // 날짜 변환
  function getDate(createAt: string) {
    const format = new Date(createAt);

    const year = format.getFullYear();
    const month = format.getMonth() + 1;
    const day = format.getDate();

    const formattedDate = `${year}년 ${month}월 ${day}일`;
    const formattedTime = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(format);

    return `${formattedDate} ${formattedTime}`;
  }

  // 수락
  function acceptFunc(data: userRequestType) {
    console.log(data);
    setRequestData(data);
    acceptFriend();
  }

  return (
    <div style={{ height: '70vh' }}>
      {friendList?.map((d, i) => {
        if (
          d.status === 0 &&
          d.friendUserID === Number(Cookies.get('user_index'))
        ) {
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
                  수락
                </span>
              </div>
            </FriendRequestContainer>
          );
        }
      })}
    </div>
  );
};

export default FriendRequest;
