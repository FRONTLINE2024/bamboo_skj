import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/pages/index'; // 정확한 경로 확인
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

jest.mock('./api/clients/home');
//@/pages/api/clients/home

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));

describe('Home Page', () => {
  const queryClient = new QueryClient();

  let createBtn: HTMLButtonElement;

  beforeEach(() => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </RecoilRoot>
    );

    createBtn = screen.getByText('작성');
  });

  test.only('게시글 생성 테스트', () => {
    fireEvent.click(createBtn);

    const boardTitle = screen.getByPlaceholderText('제목') as HTMLInputElement;
    const boardContent = screen.getByPlaceholderText(
      '글 내용 작성'
    ) as HTMLInputElement;
    const boardImg = screen.getByLabelText('이미지 업로드') as HTMLInputElement;
    const boardCompleteBtn = screen.getByText('작성 완료') as HTMLButtonElement;

    const file = new File(['dummy content'], 'campus.jpg', {
      type: 'image/jpeg',
    });

    // 입력 필드 채우기
    fireEvent.change(boardTitle, { target: { value: '제목 테스트' } });
    fireEvent.change(boardContent, { target: { value: '내용 테스트' } });

    // 파일 입력 디스패치
    fireEvent.change(boardImg, { target: { files: [file] } });

    // 가정한 onClick 이벤트 시뮬레이션
    fireEvent.click(boardCompleteBtn);

    if (!boardImg.files) {
      return;
    }

    expect(boardTitle.value).toBe('제목 테스트');
    expect(boardContent.value).toBe('내용 테스트');
    expect(boardImg.files[0]).toEqual(file);
    expect(boardImg.files).toHaveLength(1);
  });
});
