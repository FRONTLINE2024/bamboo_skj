import { deleteBoardData } from '@/pages/api/clients/home';
import { BoardType } from '@/types/home';
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
} from '@tanstack/react-query';
import Cookie from 'js-cookie';

interface useDeleteBoardType {
  refetchAllData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BoardType[], Error>>;
  getPagingBoardDelete: UseMutateFunction<BoardType[], Error, void, unknown>;
}

const useDeleteBoard = ({ getPagingBoardDelete }: useDeleteBoardType) => {
  return useMutation({
    mutationKey: ['deleteBoard'],
    mutationFn: async (id: number) => {
      const board_user_id = Cookie.get('user_index');
      if (!board_user_id) {
        return;
      }

      const body = {
        data: { id, board_user_id },
      };
      const response = await deleteBoardData(body);
      return response.data;
    },
    onSuccess: () => {
      getPagingBoardDelete();
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useDeleteBoard;
