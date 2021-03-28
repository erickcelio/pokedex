import styled, { css } from 'styled-components';

import { PokemonTypes } from 'types/pokemon';

const haldDivColor = (color: string) => css`
  position: relative;

  :before {
    content: '';
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
    background-color: ${color};
  }
`;

const colorModifier = {
  normal: css`
    background-color: #a4acaf;
  `,
  fighting: css`
    background-color: #d56723;
  `,
  flying: css`
    ${haldDivColor('#3dc7ef')}
    background-color: #bdb9b8;
  `,
  poison: css`
    background-color: #b97fc9;
  `,
  ground: css`
    ${haldDivColor('#F7DE3F')}
    background-color: #AB9842;
  `,
  rock: css`
    background-color: #a38c21;
  `,
  bug: css`
    background-color: #729f3f;
  `,
  ghost: css`
    background-color: #7b62a3;
  `,
  steel: css`
    background-color: #9eb7b8;
  `,
  fire: css`
    background-color: #fd7d24;
  `,
  water: css`
    background-color: #4592c4;
  `,
  grass: css`
    background-color: #9bcc50;
  `,
  electric: css`
    background-color: #eed535;
  `,
  psychic: css`
    background-color: #f366b9;
  `,
  ice: css`
    background-color: #51c4e8;
  `,
  dragon: css`
    ${haldDivColor('#53A4CF')}
    background-color: #F16E57;
  `,
  dark: css`
    background-color: #707070;
  `,
  fairy: css`
    background-color: #fdb9e9;
  `,
};

type ContainerProps = {
  type: PokemonTypes;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 0.8rem;
  padding: 0 3.2rem;
  height: 3.2rem;
  overflow: hidden;

  span {
    z-index: 2;
    font-weight: bold;
    color: var(--white);
    font-size: 2.4rem;
    -webkit-text-stroke-width: 0.1rem;
    -webkit-text-stroke-color: var(--black);
    text-transform: capitalize;
  }

  ${({ type }) => colorModifier[type] || null}
`;
