import { getKaKaoUserData } from '@/pages/api/clients/login';
import { useQuery } from '@tanstack/react-query';

interface useGetUserKakoDataType {
  accessToken: string;
}

const useGetUserKakoData = ({ accessToken }: useGetUserKakoDataType) => {
  return useQuery({
    queryKey: ['userKakaoData'],
    queryFn: async () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await getKaKaoUserData(headers);
      // console.log('user Data:', response);

      return response;
    },
    enabled: false,
  });
};

export default useGetUserKakoData;
