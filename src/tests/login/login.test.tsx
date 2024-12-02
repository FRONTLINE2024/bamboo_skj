import { fireEvent, render, screen } from '@testing-library/react';
import Login from '@/pages/login/index';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userType } from '@/types/login';
import { useRouter } from 'next/navigation';
import { login } from '../../pages/api/clients/login';
import { act } from 'react';
import { changeMessage, repeatInput } from '@/hooks/test';

jest.mock('../api/clients/login'); // 로그인 API 모킹

const logins = async (loginData: userType) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  return response.json();
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe('Login Page', () => {
  const queryClient = new QueryClient();

  let inputElement: HTMLInputElement;
  let pwdElement: HTMLInputElement;
  let btnElement: HTMLButtonElement;

  beforeEach(() => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </RecoilRoot>
    );

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }));

    inputElement = screen.getByPlaceholderText('ID');
    pwdElement = screen.getByPlaceholderText('Password');
    btnElement = screen.getByText('로그인');
  });

  it('첫 화면에 input 요소가 비워져있는지 확인', () => {
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('문자 입력 후 내용이 표시되는지 테스트', () => {
    const testInput = '라랄라랄';

    repeatInput([{ element: inputElement, value: testInput }]);

    expect(inputElement).toHaveValue(testInput);
  });

  it('로그인 테스트', async () => {
    repeatInput([
      {
        element: inputElement,
        value: 'testUser',
      },
      {
        element: pwdElement,
        value: 'test1',
      },
    ]);
    fireEvent.click(btnElement);

    const loginData = {
      user_id: 'testUser',
      user_password: 'test1',
      user_nickname: '유저 닉네임',
    };

    const response = await logins(loginData);

    // console.log('로그인 테스트 성공', response);

    expect(response.message).toBe('Login successful!');
  });

  it('로그인 실패: 유저 아이디가 존재하지 않을 때', async () => {
    // 로그인 API가 유저 아이디 존재하지 않는 경우 설정
    (login as jest.Mock).mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: '유저 아이디가 존재하지 않습니다!',
          },
        },
        status: 401,
      })
    );

    await act(async () => {
      repeatInput([
        {
          element: inputElement,
          value: 'notUser',
        },
        {
          element: pwdElement,
          value: 'password123',
        },
      ]);
      fireEvent.click(btnElement);
    });

    const toastMessage =
      await changeMessage('유저 아이디가 존재하지 않습니다!');

    expect(toastMessage).toBeInTheDocument();
  });

  it('로그인 실패: 비밀번호가 틀릴 때', async () => {
    (login as jest.Mock).mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: '비밀번호가 틀립니다!',
          },
        },
        status: 401,
      })
    );
    await act(() => {
      repeatInput([
        {
          element: inputElement,
          value: 'testUser',
        },
        {
          element: pwdElement,
          value: 'wrongPassword',
        },
      ]);
      fireEvent.click(btnElement);
    });

    const toastMessage = await changeMessage('비밀번호가 틀립니다!');

    expect(toastMessage).toBeInTheDocument();
  });

  it('실제 api 로그인 테스트', async () => {
    await act(async () => {
      repeatInput([
        {
          element: inputElement,
          value: 'testUser',
        },
        {
          element: pwdElement,
          value: 'test1',
        },
      ]);
      fireEvent.click(btnElement);
    });
  });
});
