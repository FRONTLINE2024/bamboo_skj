// apis
import { patchBoardData } from '@/pages/api/clients/home';

// types
import { BoardType } from '@/types/home';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface usePatchBoardType {
  formPatchData: FormData;
  refetchSpecificData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BoardType, Error>>;
  refetchAllData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BoardType[], Error>>;
}

const usePatchBoard = ({
  formPatchData,
  refetchSpecificData,
  refetchAllData,
}: usePatchBoardType) => {
  return useMutation({
    mutationKey: ['patchBoard'],
    mutationFn: async () => {
      const response = await patchBoardData(formPatchData);
      return response.data;
    },
    onSuccess: () => {
      refetchSpecificData();
      refetchAllData();
    },
  });
};

export default usePatchBoard;
