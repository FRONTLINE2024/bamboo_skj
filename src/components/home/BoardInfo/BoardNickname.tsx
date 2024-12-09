import { useContext } from 'react';

// contexts
import { boardContext } from '@/context/homeContext';

// styles
import { Flex } from '@/styles/common/direction';

interface BoardNicknameType {
  sortingLogo(universityName: string): JSX.Element | undefined;
}
const BoardNickname = ({ sortingLogo }: BoardNicknameType) => {
  const context = useContext(boardContext);

  const { selected } = context;

  return (
    <div
      style={{
        ...Flex,
        width: '200px',
        height: '30px',
        justifyContent: 'flex-start',
        fontFamily: 'GmarketSansBold',
      }}
    >
      {sortingLogo(selected.university)}
      <span className="nickname" style={{ marginLeft: '5px' }}>
        {selected.user_nickname}
      </span>
    </div>
  );
};

export default BoardNickname;
