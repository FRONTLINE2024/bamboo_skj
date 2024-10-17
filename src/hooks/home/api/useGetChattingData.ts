import { getAllChattingData } from '@/pages/api/clients/home';
import { ChattingDataType } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';

const useGetChattingData = () => {
  return useQuery<ChattingDataType[], Error>({
    queryKey: ['getChattingData'],
    queryFn: async () => {
      const response = await getAllChattingData();
      console.log(response);

      return response.data;
    },
  });
};

export default useGetChattingData;
