import { signup } from '@/pages/api/clients/signup';
import { ToastStateType } from '@/types/home';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
interface useUserLoginType {
  user_id: string;
  user_password: string;
  user_nickname: string;
  setToastState: React.Dispatch<SetStateAction<ToastStateType>>;
  handleToast(): void;
}

const useUserLogin = ({
  user_id,
  user_password,
  user_nickname,
  setToastState,
  handleToast,
}: useUserLoginType) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async () => {
      const body = {
        user_id,
        user_password,
        user_nickname,
      };
      const response = await signup(body);

      console.log(response);

      if (response.status === 201) {
        setToastState((prev) => ({
          ...prev,
          stateCode: `${response.status}`,
          stateText: '회원가입 성공!',
        }));

        handleToast();
        setTimeout(() => {
          router.push('/login');
        }, 2510);
      }
    },
    onError(err: AxiosError) {
      console.log(err);
      if (err.status === 409) {
        setToastState((prev) => ({
          ...prev,
          stateCode: '409',
          stateText: '이미 존재하는 아이디입니다!',
        }));

        handleToast();
      }
    },
  });
};

export default useUserLogin;
