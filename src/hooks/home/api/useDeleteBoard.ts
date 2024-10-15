import { deleteBoardData } from '@/pages/api/clients/home';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import Cookie from 'js-cookie';

interface useDeleteBoardType {
  refetchAllData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

const useDeleteBoard = ({ refetchAllData }: useDeleteBoardType) => {
  return useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: async (id: number) => {
      const board_user_id = Cookie.get('user_index');
      const body = {
        data: { id, board_user_id },
      };
      const response = await deleteBoardData(body);
      return response.data;
    },
    onSuccess: () => {
      refetchAllData();
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useDeleteBoard;
