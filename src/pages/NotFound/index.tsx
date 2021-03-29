import React from 'react';
import snorlaxImage from 'assets/snorlax.png';

import * as S from './styles';

const NotFoundPage: React.FC = () => {
  return (
    <S.Container>
      <h1>404</h1>
      <img src={snorlaxImage} alt="Snorlax" />
    </S.Container>
  );
};

export default NotFoundPage;
