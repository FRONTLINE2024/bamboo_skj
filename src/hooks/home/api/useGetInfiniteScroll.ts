import { SetStateAction } from 'react';

// apis
import { getInfiniteData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

interface useInfiniteScrollType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
  deleteBoardId: number;
}

const useGetInfiniteScroll = ({
  setInfiniteBoardData,
  deleteBoardId,
}: useInfiniteScrollType) => {
  return useMutation({
    mutationKey: ['scrollData'],
    mutationFn: async () => {
      const boardLimit = Number(localStorage.getItem('limit'));
      const offset = 0;

      const response = await getInfiniteData({ offset, limit: boardLimit });

      console.log(offset, boardLimit);
      console.log(response);

      return response.data;
    },
    onSuccess: (data: BoardType[]) => {
      setInfiniteBoardData((prev) => {
        const filteredPrev = prev.filter(
          (item) => item.id !== 0 && item.id !== deleteBoardId
        );

        const newBoards = data.filter(
          (newItem) =>
            !filteredPrev.some((existingItem) => existingItem.id === newItem.id)
        );

        return [...filteredPrev, ...newBoards];
      });
    },
  });
};

export default useGetInfiniteScroll;
