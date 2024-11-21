// apis
import { getAllChattingData } from '@/pages/api/clients/home';

// types
import { ChattingDataType } from '@/types/chat';

// libraries
import { useQuery } from '@tanstack/react-query';

const useGetChattingData = () => {
  return useQuery<ChattingDataType[], Error>({
    queryKey: ['getChattingData'],
    queryFn: async () => {
      const response = await getAllChattingData();

      return response.data;
    },
  });
};

export default useGetChattingData;
