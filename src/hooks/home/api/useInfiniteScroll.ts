import { getInfiniteData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { SetStateAction } from 'react';

interface useInfiniteScrollType {
  infiniteBoardData: BoardType[];
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

const useInfiniteScroll = ({
  setInfiniteBoardData,
  currentPage,
}: useInfiniteScrollType) => {
  return useMutation({
    mutationKey: ['scrollData'],
    mutationFn: async () => {
      const limit = 10;
      const offset = currentPage * limit;
      const response = await getInfiniteData({ offset, limit });
      console.log(offset, limit);
      console.log(response);

      return response.data;
    },
    onSuccess: (data: BoardType[]) => {
      setInfiniteBoardData((prev) => {
        const filteredPrev = prev.filter((item) => item.id !== 0);

        const newBoards = data.filter(
          (newItem) =>
            !filteredPrev.some((existingItem) => existingItem.id === newItem.id)
        );

        return [...filteredPrev, ...newBoards];
      });
    },
  });
};

export default useInfiniteScroll;
