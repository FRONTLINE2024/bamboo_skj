import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '@/pages/login/index';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userType } from '@/types/login';
import { useRouter } from 'next/navigation';
import { login } from '../api/clients/login'; // API 호출 경로를 수정하세요
import { act } from 'react';

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
  const mockPush = jest.fn(); // push 메서드 mock
  const queryClient = new QueryClient();
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
  });

  it('첫 화면에 input 요소가 비워져있는지 확인', () => {
    const inputElement = screen.getByPlaceholderText('ID');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('문자 입력 후 내용이 표시되는지 테스트', () => {
    const testInput = '라랄라랄';
    const inputElement = screen.getByPlaceholderText('ID');

    fireEvent.change(inputElement, { target: { value: testInput } });

    expect(inputElement).toHaveValue(testInput);
  });

  it('로그인 테스트', async () => {
    const inputElement = screen.getByPlaceholderText('ID');
    const pwdElement = screen.getByPlaceholderText('Password');

    fireEvent.change(inputElement, { target: { value: 'testUser' } });
    fireEvent.change(pwdElement, { target: { value: 'test1' } });

    const loginButton = screen.getByText('로그인');
    fireEvent.click(loginButton);

    const loginData = { user_id: 'testUser', user_password: 'test1' };

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

    const inputElement = screen.getByPlaceholderText('ID');
    const pwdElement = screen.getByPlaceholderText('Password');

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'notUser' } });
      fireEvent.change(pwdElement, { target: { value: 'password123' } });

      const loginButton = screen.getByText('로그인');
      fireEvent.click(loginButton);
    });

    // 토스트 메시지가 발생할 때까지 기다립니다.
    const toastMessage = await waitFor(
      () => screen.getByText(/유저 아이디가 존재하지 않습니다!/i) // 정확한 메시지 내용
    );

    expect(toastMessage).toBeInTheDocument(); // 메시지가 문서에 존재하는지 확인
  });

  it('로그인 실패: 비밀번호가 틀릴 때', async () => {
    // 로그인 API가 비밀번호가 틀린 경우 설정
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

    const inputElement = screen.getByPlaceholderText('ID');
    const pwdElement = screen.getByPlaceholderText('Password');
    await act(() => {
      fireEvent.change(inputElement, { target: { value: 'testUser' } });
      fireEvent.change(pwdElement, { target: { value: 'wrongPassword' } });

      const loginButton = screen.getByText('로그인');
      fireEvent.click(loginButton);
    });

    // 토스트 메시지가 발생할 때까지 기다립니다.
    const toastMessage = await waitFor(
      () => screen.getByText(/비밀번호가 틀립니다!/i) // 정확한 메시지 내용
    );

    expect(toastMessage).toBeInTheDocument(); // 메시지가 문서에 존재하는지 확인
  });

  it('실제 api 로그인 테스트', async () => {
    const inputElement = screen.getByPlaceholderText('ID');
    const pwdElement = screen.getByPlaceholderText('Password');

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'testUser' } });
      fireEvent.change(pwdElement, { target: { value: 'test1' } });

      const loginButton = screen.getByText('로그인');
      fireEvent.click(loginButton);
    });
  });
});
