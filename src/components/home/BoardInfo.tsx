import Image from 'next/image';
import { useContext, useState } from 'react';

// constants
import { universities } from '@/constants/universities';

// contexts
import { boardContext } from '@/context/homeContext';

// components
import BoardTitle from './BoardInfo/BoardTitle';
import BoardNickname from './BoardInfo/BoardNickname';
import BoardDate from './BoardDate';
import BoardContent from './BoardInfo/BoardContent';
import BoardButton from './BoardInfo/BoardButton';

interface BoardInfoType {
  handleSelectedImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BoardInfo = ({ handleSelectedImg }: BoardInfoType) => {
  const context = useContext(boardContext);

  const { selected } = context;

  const [previewImage, setPreviewImage] = useState(selected.board_img);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      handleSelectedImg(e);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  function sortingLogo(universityName: string) {
    if (universityName) {
      const logo = universities.filter(
        (university) => university.name === universityName
      );
      // console.log(logo);

      return (
        <Image
          src={logo[0].img.src}
          alt="대학교로고"
          width={25}
          height={25}
          style={{ objectFit: 'contain' }}
        />
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '5px',
        marginTop: '2rem',
      }}
    >
      <BoardTitle />
      <BoardNickname sortingLogo={sortingLogo} />
      <BoardDate />
      <BoardContent
        previewImage={previewImage}
        handleFileChange={handleFileChange}
      />
      <BoardButton />
    </div>
  );
};

export default BoardInfo;
