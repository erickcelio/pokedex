import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/logo.svg';

import * as S from './styles';

const MainLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const notOnHomePage = useMemo(() => location.pathname !== '/', [location]);

  return (
    <S.Container>
      <S.LogoContainer notOnHomePage={notOnHomePage}>
        <Logo />
      </S.LogoContainer>
      <div>{children}</div>
    </S.Container>
  );
};

export default MainLayout;
