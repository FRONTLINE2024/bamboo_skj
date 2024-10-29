import { findUser } from '@/pages/api/clients/login';
import { useQuery } from '@tanstack/react-query';

interface useGetFindUserType {
  userIndex: string | false | null;
}

const useGetFindUser = ({ userIndex }: useGetFindUserType) => {
  return useQuery({
    queryKey: ['findUser', userIndex],
    queryFn: async () => {
      const response = await findUser(Number(userIndex));

      console.log(response);
      return response.data;
    },

    enabled: false,
  });
};

export default useGetFindUser;
