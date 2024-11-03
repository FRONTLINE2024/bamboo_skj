import { DescendData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useGetDateDescendDataType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetDateDescendData = ({
  setInfiniteBoardData,
}: useGetDateDescendDataType) => {
  return useMutation({
    mutationKey: ['DateDescendData'],
    mutationFn: async () => {
      const response = await DescendData();
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

export default useGetDateDescendData;
