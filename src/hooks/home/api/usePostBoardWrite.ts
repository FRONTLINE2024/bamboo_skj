import { postBoardData } from '@/pages/api/clients/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface usePostBoardWriteType {
  closeModalBoard: () => void;
  refetchAllData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
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
