import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

// apis
import { login } from '@/pages/api/clients/login';

// types
import { ToastStateType } from '@/types/home';
import { userType } from '@/types/login';

// libraries
import { useMutation } from '@tanstack/react-query';
import Cookie from 'js-cookie';

interface usePostUserLoginType {
  loginData: userType;
  setToastState: React.Dispatch<SetStateAction<ToastStateType>>;
  handleToast(): void;
}

const usePostUserLogin = ({
  loginData,
  setToastState,
  handleToast,
}: usePostUserLoginType) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const response = await login(loginData);

      return response.data;
    },
    onSuccess: (data) => {
      // console.log(data);
      Cookie.set('accessToken', data.token);
      Cookie.set('user_index', data.data.user_index);
      Cookie.set('user_index', data.data.user_index);
      router.push('/');
    },
    // 타입 지정 알아보기
    onError(err: any) {
      setToastState((prev) => ({
        ...prev,
        stateText: `${err.response.data.message}`,
        stateCode: `${err.status}`,
      }));

      handleToast();
    },
  });
};

export default usePostUserLogin;
