import { AllData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import { SetStateAction } from 'react';
interface useGetAllDataType {
  setData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetAllData = ({ setData }: useGetAllDataType) => {
  const { data, isLoading, error, refetch, isSuccess } = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const response = await AllData();
      // console.log('게시글 전체 데이터: ', response);
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
