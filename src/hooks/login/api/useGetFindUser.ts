import { useRouter } from 'next/navigation';

// apis
import { findUser } from '@/pages/api/clients/login';

// libraries
import { useMutation } from '@tanstack/react-query';
import Cookie from 'js-cookie';

interface useGetFindUserType {
  userIndex: string | false | null;
}

const useGetFindUser = ({ userIndex }: useGetFindUserType) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['findUser', userIndex],
    mutationFn: async () => {
      const response = await findUser(Number(userIndex));

      console.log(response);
      return response.data;
    },
    onSuccess: (data) => {
      router.push('/');
      const { accessToken, user_nickname, profile_image, user_index } =
        data.data;
      Cookie.set('accessToken', accessToken);
      Cookie.set('user_nickname', user_nickname);
      Cookie.set('profile_image', profile_image);
      Cookie.set('user_index', user_index);
    },
    onError: (err) => {
      console.log(err);
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIREACT_URI}&response_type=code`;
      window.location.href = kakaoURL;
    },
  });
};

export default useGetFindUser;
