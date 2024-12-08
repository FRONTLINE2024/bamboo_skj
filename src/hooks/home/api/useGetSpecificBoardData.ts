// apis
import { getSpecificBoard } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';

interface useGetSpecificBoardDataType {
  selected: BoardType;
}

const useGetSpecificBoardData = ({ selected }: useGetSpecificBoardDataType) => {
  return useQuery({
    queryKey: ['getSpecificBoardData', selected.id],
    queryFn: async () => {
      if (!selected.id) throw new Error('Selected ID is required');
      const response = await getSpecificBoard(selected.id);

      return response.data;
    },
    enabled: !!selected.id,
  });
};

export default useGetSpecificBoardData;
