import { SetStateAction, useCallback } from 'react';

// apis
import { getInfiniteData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

interface useInfiniteScrollType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
  currentPage: number;
}

const useInfiniteScroll = ({
  setInfiniteBoardData,
  currentPage,
}: useInfiniteScrollType) => {
  const fetchInfiniteData = useCallback(async () => {
    const limit = 10;
    const offset = currentPage * limit;
    const response = await getInfiniteData({ offset, limit });

    return response.data;
  }, [currentPage]);

  // useMutation 훅 사용
  const { mutate, isSuccess } = useMutation({
    mutationKey: ['scrollData'],
    mutationFn: fetchInfiniteData,
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

  return { mutate, isSuccess };
};

export default useInfiniteScroll;
