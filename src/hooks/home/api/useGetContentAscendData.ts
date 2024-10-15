import { ContentAscendData, DescendData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useGetDateAscendDataType {
  setData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const usegetContentAscendData = ({ setData }: useGetDateAscendDataType) => {
  return useMutation({
    mutationKey: ['ContentAscendData'],
    mutationFn: async () => {
      const response = await ContentAscendData();
      return response.data;
    },
    onSuccess: (data) => {
      setData(data.data);
    },
    onError(err) {
      console.log(err);
    },
  });
};

export default usegetContentAscendData;
