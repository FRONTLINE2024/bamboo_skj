import { SetStateAction } from 'react';
// apis
import { patchBoardData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
} from '@tanstack/react-query';

interface usePatchBoardType {
  formPatchData: FormData;
  refetchSpecificData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BoardType, Error>>;
  getPagingData: UseMutateFunction<BoardType[], Error, void, unknown>;
}

const usePatchBoard = ({
  formPatchData,
  refetchSpecificData,
  getPagingData,
}: usePatchBoardType) => {
  return useMutation({
    mutationKey: ['patchBoard'],
    mutationFn: async () => {
      const response = await patchBoardData(formPatchData);

      return response.data;
    },
    onSuccess: (data: BoardType) => {
      console.log(data);

      refetchSpecificData();
      getPagingData();
    },
  });
};

export default usePatchBoard;
