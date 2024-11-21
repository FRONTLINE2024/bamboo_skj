import { SetStateAction } from 'react';

// apis
import { DescendData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';

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
