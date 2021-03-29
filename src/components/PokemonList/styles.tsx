import styled from 'styled-components';
import { media } from 'styles/media';

export const Container = styled.div`
  width: 100%;
  border: 0.1rem solid var(--yellow);
  border-radius: 0.8rem;

  a {
    text-decoration: none;
  }
`;

export const PokemonsContainer = styled.div`
  display: flex;
  padding: 1.6rem;
  flex-wrap: wrap;
  justify-content: space-between;

  ${media.tablet} {
    justify-content: space-around;
  }

  ${media.phone} {
    justify-content: center;

    a {
      width: 100%;
    }
  }
`;

type PokemonProps = {
  color: string;
};

export const Pokemon = styled.div<PokemonProps>`
  width: 20rem;
  height: 20rem;
  display: flex;
  margin: 1.6rem;
  cursor: pointer;
  border-radius: 0.8rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.25);
  background-color: var(--pokemon-color-${({ color }) => color});
  transition: all 0.3s linear;

  img {
    width: 12rem;
    height: 12rem;
  }

  span {
    margin-top: 1.6rem;
    font-size: 3.2rem;
    font-weight: bold;
    line-height: 120%;

    color: var(--white);
    -webkit-text-stroke-width: 0.15rem;
    -webkit-text-stroke-color: var(--black);
  }

  &:hover {
    transform: scale(1.1);
  }

  ${media.phone} {
    width: 100%;
    margin: 1.6rem 0;
  }
`;
