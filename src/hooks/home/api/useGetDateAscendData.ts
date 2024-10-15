import { AscendData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface useGetDateAscendDataType {
  setData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetDateAscendData = ({ setData }: useGetDateAscendDataType) => {
  return useMutation({
    mutationKey: ['DateAscendData'],
    mutationFn: async () => {
      const response = await AscendData();
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

export default useGetDateAscendData;
