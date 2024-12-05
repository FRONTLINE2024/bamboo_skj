// icons
import { PiUserCircleFill } from 'react-icons/pi';
// styles
import { Flex } from '@/styles/common/direction';
// types
import { listType } from '../Chat';

interface ChatUserListType {
  chatUserList: listType[];
  processChattingRoom({ id, userNickname }: listType): void;
  sortingLogo(universityName: string): JSX.Element | undefined;
}
const ChatUserList = ({
  chatUserList,
  processChattingRoom,
  sortingLogo,
}: ChatUserListType) => {
  return chatUserList?.map((user, i) => {
    return (
      <div
        key={i}
        className="chatList"
        style={{
          ...Flex,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5px',
          fontFamily: 'GmarketSansMedium',
        }}
        onClick={() => processChattingRoom(user)}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user.university ? (
            sortingLogo(user.university)
          ) : (
            <PiUserCircleFill size={30} color="#e1e1e1" />
          )}
        </div>

        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '10px',
          }}
        >
          {user.userNickname}
        </div>
        <div> </div>
      </div>
    );
  });
};

export default ChatUserList;
