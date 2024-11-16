import useGetFriendRequest from '@/hooks/home/api/useGetFriendRequest';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const FriendRequestUserList = () => {
  // 친구 요청
  const { data, refetch } = useGetFriendRequest();

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

  return (
    <div>
      {data?.map((d, i) => (
        <div key={i}>
          <span>{d.userEmail}</span>
          <span>{getDate(d.createAt)}</span>
          <span>{d.status === 0 ? '수락' : '추가'}</span>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestUserList;
