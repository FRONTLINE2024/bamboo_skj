import { SetStateAction } from 'react';

// apis
import { ContentAscendData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

interface useGetDateAscendDataType {
  setInfiniteBoardData: React.Dispatch<SetStateAction<BoardType[]>>;
}

const useGetContentAscendData = ({
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

export default useGetContentAscendData;
