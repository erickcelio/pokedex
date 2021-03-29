import styled from 'styled-components';
import { media } from 'styles/media';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin-bottom: 3.2rem;
    font-size: 10rem;
    font-weight: bold;
    color: var(--yellow);
    -webkit-text-stroke-width: 0.3rem;
    -webkit-text-stroke-color: var(--black);

    ${media.phone} {
      font-size: 8rem;
    }
  }

  img {
    width: 100%;
    max-width: 40rem;
  }
`;
