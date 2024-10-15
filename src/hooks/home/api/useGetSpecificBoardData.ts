import { deleteBoardData, getSpecificBoard } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Cookie from 'js-cookie';

interface useGetSpecificBoardDataType {
  selected: BoardType;
}

const useGetSpecificBoardData = ({ selected }: useGetSpecificBoardDataType) => {
  return useQuery({
    queryKey: ['getSpecificBoardData', selected.id],
    queryFn: async () => {
      if (!selected.id) throw new Error('Selected ID is required');
      const response = await getSpecificBoard(selected.id);
      return response.data; // API 응답 처리
    },
    enabled: !!selected.id, // selected.id가 존재할 때만 쿼리 실행
  });
};

export default useGetSpecificBoardData;
