import { postBoardData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface usePostBoardWriteType {
  closeModalBoard: () => void;
  refetchAllData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BoardType[], Error>>;
  formData: FormData;
}

const usePostBoardWrite = ({
  closeModalBoard,
  refetchAllData,
  formData,
}: usePostBoardWriteType) => {
  return useMutation({
    mutationKey: ['boardWrite'],
    mutationFn: async () => {
      const response = await postBoardData(formData);

      return response;
    },
    onSuccess: () => {
      closeModalBoard();
      refetchAllData();
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default usePostBoardWrite;
