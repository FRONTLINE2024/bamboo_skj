import { ContentAscendData, DescendData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useGetDateAscendDataType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const usegetContentAscendData = ({
  setInfiniteBoardData,
}: useGetDateAscendDataType) => {
  return useMutation({
    mutationKey: ['ContentAscendData'],
    mutationFn: async () => {
      const response = await ContentAscendData();
      return response.data;
    },
    onSuccess: (data) => {
      setInfiniteBoardData(data.data);
    },
    onError(err) {
      console.log(err);
    },
  });
};

export default usegetContentAscendData;
