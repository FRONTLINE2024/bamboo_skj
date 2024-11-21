import { SetStateAction } from 'react';

// apis
import { AscendData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

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
