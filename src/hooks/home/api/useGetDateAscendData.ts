import { AscendData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useGetDateAscendDataType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetDateAscendData = ({
  setInfiniteBoardData,
}: useGetDateAscendDataType) => {
  return useMutation({
    mutationKey: ['DateAscendData'],
    mutationFn: async () => {
      const response = await AscendData();
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

export default useGetDateAscendData;
