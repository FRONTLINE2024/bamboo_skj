import { SetStateAction } from 'react';

// apis
import { AllData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useQuery } from '@tanstack/react-query';

interface useGetAllDataType {
  setData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetAllData = ({ setData }: useGetAllDataType) => {
  const { data, isLoading, error, refetch, isSuccess } = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const response = await AllData();

      if (response.status === 200) {
        setData(response.data);
      }
      return response.data;
    },
    enabled: false,
  });

  return { data, isLoading, error, refetch, isSuccess };
};

export default useGetAllData;
