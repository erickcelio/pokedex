import React from 'react';
import { PokemonTypes } from 'types/pokemon';

import * as S from './styles';

type PokemonTypeProps = {
  type: PokemonTypes;
};

const PokemonType: React.FC<PokemonTypeProps> = ({ type }) => {
  return (
    <S.Container type={type}>
      <span>{type}</span>
    </S.Container>
  );
};

export default PokemonType;
