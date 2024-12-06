import { SetStateAction } from 'react';

// apis
import { getInfiniteData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

interface useInfiniteScrollType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetScrollData = ({ setInfiniteBoardData }: useInfiniteScrollType) => {
  return useMutation({
    mutationKey: ['scrollData'],
    mutationFn: async () => {
      const boardLimit = Number(localStorage.getItem('limit'));
      const offset = 0;

      const response = await getInfiniteData({ offset, limit: boardLimit });

      return response.data;
    },
    onSuccess: (data: BoardType[]) => {
      setInfiniteBoardData(data);
    },
  });
};

export default useGetScrollData;
