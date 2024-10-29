import { theme } from '@/styles/common/color';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    font-family: 'GmarketSansBold';
    font-size: 1.5rem;
  }
`;

export const Letter = styled.span<{ $index: number }>`
  animation: ${floatAnimation} 1.5s ease-in-out infinite;
  animation-delay: ${(props) => props.$index * 0.2}s;
  color: ${(props) => (props.$index % 2 === 0 ? 'black' : theme.secondary)};
`;

// 로고 배치
export const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 0.5fr);
  width: 300px; // 글자 길이에 맞춰 변경 가능
  margin-bottom: -50px;
`;
