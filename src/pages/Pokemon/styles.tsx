import styled, { keyframes } from 'styled-components';

const grow = (size: number) => keyframes`
  0% {
    width: 0%;
  }

  100% {
    width: ${size}%
  }
`;

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1.6rem;
  grid-template-areas:
    'title title'
    'image description'
    'stats attributes'
    'evolutions evolutions';

  grid-template-columns: 50% 50%;
`;

const ContainerBase = styled.div`
  padding: 1.6rem;
  border-radius: 0.8rem;
  background-color: white;

  h2 {
    font-size: 3.2rem;
    color: var(--white);
    -webkit-text-stroke-width: 0.15rem;
    -webkit-text-stroke-color: var(--black);
    margin-bottom: 1.6rem;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: bold;
    color: var(--white);
    -webkit-text-stroke-width: 0.125rem;
    -webkit-text-stroke-color: var(--black);
  }
`;

export const TitleContainer = styled.div`
  grid-area: title;
  text-align: center;
  font-size: 4.2rem;
  font-weight: bold;
  line-height: 120%;
  text-transform: capitalize;

  color: var(--white);
  -webkit-text-stroke-width: 0.15rem;
  -webkit-text-stroke-color: var(--black);
`;

export const ImageContainer = styled(ContainerBase)<{ color: string }>`
  grid-area: image;

  display: flex;
  padding: 4.8rem;
  align-items: center;
  justify-content: center;
  background-color: var(--pokemon-color-${({ color }) => color});

  img {
    width: 20rem;
    height: 20rem;
  }
`;

export const DescriptionContainer = styled(ContainerBase)`
  grid-area: description;

  div {
    div {
      display: flex;

      div {
        margin-top: 1.6rem;

        & + div {
          margin-left: 1.6rem;
        }
      }
    }

    & + div {
      margin-top: 1.6rem;
    }
  }
`;

export const StatsContainer = styled(ContainerBase)`
  grid-area: stats;

  ul {
    li {
      display: flex;
      align-items: center;
    }
  }
`;

export const StatBar = styled.div<{ value: number }>`
  width: 100%;
  height: 2rem;
  max-width: 40rem;
  border-radius: 2rem;
  border: 1px solid var(--black);
  margin-left: auto;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    width: 0%;
    height: 100%;
    position: absolute;
    background-color: var(--yellow);

    animation: ${({ value }) => grow(value / 2)} 2s forwards;
  }
`;

export const AttributesContainer = styled(ContainerBase)`
  grid-area: attributes;
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 1 0 50%;
      display: flex;
      flex-direction: column;

      span {
        margin-top: 0.8rem;
        color: var(--black);
        font-weight: bold;
        font-size: 2rem;

        text-transform: capitalize;
      }

      &:nth-child(3) {
        margin-top: 1.8rem;
      }
    }
  }
`;

export const EvolutionsContainer = styled(ContainerBase)`
  grid-area: evolutions;
  text-align: center;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
    justify-content: center;

    li {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 8rem;

      img {
        width: 10rem;
        height: 10rem;
      }

      a {
        text-decoration: none;
      }

      h3 {
        margin-top: 0.8rem;
        text-transform: capitalize;
      }

      svg {
        width: 3.2rem;
        height: 3.2rem;
        position: absolute;
        right: 0;
      }

      &:last-child {
        svg {
          display: none;
        }
      }
    }
  }
`;
