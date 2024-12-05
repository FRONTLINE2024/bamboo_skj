import { useEffect, useState } from 'react';

// styles
import { FriendHeader } from '@/styles/home/styles';

// type
import { userRequestType } from '@/types/home';

// components
import UserList from './Friend/UserList';
import FriendRequest from './Friend/FriendRequest';
import FriendList from './Friend/FriendList';

// apis
import useGetFriendRequest from '@/hooks/home/api/useGetFriendRequest';

// libraries
import Cookies from 'js-cookie';

const FriendRequestUserList = () => {
  // 기본 탭 상태
  const [activeTab, setActiveTab] = useState('');
  // 친구 요청 데이터
  const [requestData, setRequestData] = useState<userRequestType>({
    createAt: '',
    friendUserID: 0,
    id: 0,
    status: 0,
    userID: Number(Cookies.get('user_index')),
    userEmail: '',
    university: '',
  });
  const { userID, friendUserID, status } = requestData;

  const { data: friendList, refetch: requestFriend } = useGetFriendRequest();

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

  // 컴포넌트 변경
  const renderContent = () => {
    switch (activeTab) {
      case 'friendRequests':
        return (
          <FriendRequest
            friendList={friendList}
            requestFriend={requestFriend}
          />
        );
      case 'friendList':
        return (
          <FriendList
            getDate={getDate}
            setRequestData={setRequestData}
            userID={userID}
            friendUserID={friendUserID}
            status={status}
            friendList={friendList}
            requestFriend={requestFriend}
          />
        );
      case 'userList':
        return (
          <UserList
            setRequestData={setRequestData}
            friendList={friendList}
            requestFriend={requestFriend}
            friendUserID={friendUserID}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setActiveTab('friendRequests');
    requestFriend();
  }, []);

  return (
    <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
      <FriendHeader>
        <span
          className={activeTab === 'friendRequests' ? 'active' : ''}
          onClick={() => setActiveTab('friendRequests')}
        >
          받은 친구 요청
        </span>
        <span
          className={activeTab === 'friendList' ? 'active' : ''}
          onClick={() => setActiveTab('friendList')}
        >
          내 친구 리스트
        </span>
        <span
          className={activeTab === 'userList' ? 'active' : ''}
          onClick={() => setActiveTab('userList')}
        >
          전체 유저 리스트
        </span>
      </FriendHeader>
      {renderContent()}
    </div>
  );
};

export default FriendRequestUserList;
