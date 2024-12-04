import { BoardType } from '@/types/home';
import { atom } from 'recoil';

export const selectedPost = atom<BoardType>({
  key: 'selectedPost',
  default: {
    id: 0,
    board_title: '',
    board_user_id: '',
    board_content: '',
    board_img: '',
    createdAt: '',
    university: '',
    user_nickname: '',
  },
});
