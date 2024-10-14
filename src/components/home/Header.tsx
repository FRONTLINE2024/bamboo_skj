// styles
import { HomeHeader, HomeInput } from '@/styles/styles';
// icons
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <HomeHeader>
      <span className="projectTitle">FrontLine▹</span>
      <HomeInput />
      <div className="headerContainer">
        <FaUserCircle size={25} className="user" />
      </div>
    </HomeHeader>
  );
};

export default Header;
