import { useEffect, useState } from 'react';

// styles
import { HomeHeader, HomeInput } from '@/styles/styles';
// icons
import { FaUserCircle } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { FaUserFriends } from 'react-icons/fa';

// libraries
import Cookie from 'js-cookie';
import { Flex } from '@/styles/common/direction';
import { useRouter } from 'next/navigation';

interface HeaderType {
  handleDropdown: () => void;
  dropdownBoolean: boolean;
  handleFriendModal: () => void;
}

const Header = ({
  handleDropdown,
  dropdownBoolean,
  handleFriendModal,
}: HeaderType) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const userId = Cookie.get('user_index') || '';

  useEffect(() => {
    setIsClient(true);
  }, []);

  function logOut() {
    Cookie.remove('accessToken');
    Cookie.remove('user_index');
    router.replace('/login');
  }

  return (
    <HomeHeader $dropdownboolean={dropdownBoolean.toString()}>
      <span className="projectTitle">FrontLine▹</span>
      <HomeInput />
      <div className="headerContainer">
        {isClient && userId.length > 0 ? ( // 기본값을 설정해 효과가 없다면 프리벤션
          <div style={{ ...Flex, flexDirection: 'column' }}>
            <FaUserCircle size={25} className="user" onClick={handleDropdown} />
            {dropdownBoolean && (
              <div
                style={{
                  ...Flex,
                  flexDirection: 'column',
                  position: 'absolute',
                  marginTop: '6.5rem',
                  justifyContent: 'space-evenly',
                  height: '75px',
                  // height: '200px',
                }}
              >
                <FaUserFriends
                  size={20}
                  className="logoutIcon"
                  onClick={handleFriendModal}
                />
                <CiLogout size={20} className="logoutIcon" onClick={logOut} />
              </div>
            )}
          </div>
        ) : (
          <CiLogin size={25} className="logIn" />
        )}
      </div>
    </HomeHeader>
  );
};

export default Header;
