import React from 'react';

import { ReactComponent as Pokeboll } from 'assets/pokeball.svg';

import * as S from './styles';

type LoadingProps = {
  isLoading?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isLoading = true }) => {
  return isLoading ? (
    <S.Container>
      <Pokeboll />
    </S.Container>
  ) : null;
};

export default Loading;
