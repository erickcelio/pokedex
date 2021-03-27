import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/logo.svg';

import * as S from './styles';

const MainLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const notOnHomePage = useMemo(() => location.pathname !== '/', [location]);

  return (
    <S.Container>
      <S.LogoContainer notOnHomePage={notOnHomePage}>
        <Link to="/">
          <Logo />
        </Link>
      </S.LogoContainer>
      {children}
    </S.Container>
  );
};

export default MainLayout;
