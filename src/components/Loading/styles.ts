import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 2.4rem auto;
  animation: ${rotate} 0.8s linear infinite;

  svg {
    width: 4rem;
    height: 4rem;
  }
`;
