import { getInfiniteData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useInfiniteScrollType {
  infiniteBoardData: BoardType[];
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useInfiniteScroll = ({
  infiniteBoardData,
  setInfiniteBoardData,
}: useInfiniteScrollType) => {
  return useMutation({
    mutationKey: ['scroll'],
    mutationFn: async () => {
      const limit = 8;
      const offset = 8;
      const response = await getInfiniteData({ offset, limit });
      // console.log(response);

      return response.data;
    },
    onSuccess: (data: BoardType[]) => {
      console.log('data: ', data);
      console.log('infiniteBoardData: ', infiniteBoardData);

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
