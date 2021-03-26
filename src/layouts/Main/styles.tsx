import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  padding: 3.2rem;
  align-items: center;
  max-width: 134.4rem;
  flex-direction: column;
`;

type LogoContainerProps = {
  notOnHomePage: boolean;
};

export const LogoContainer = styled.div<LogoContainerProps>`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;
  transition: all 0.6s ease-in-out;

  ${({ notOnHomePage }) =>
    notOnHomePage &&
    css`
      margin-top: 0;
      padding-bottom: 3.2rem;

      svg {
        width: 18.6rem;
        height: 6.4rem;
      }

      border-bottom: 0.1rem solid var(--gray);
    `};
`;
