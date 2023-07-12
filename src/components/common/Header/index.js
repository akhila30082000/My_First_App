import React from 'react';
import { styled } from '@material-ui/core/styles';
import csmartNewLogo from '../../../assets/csmartNewLogo.png';
import ButtonComponent from '../ButtonComponent';
import PropTypes from 'prop-types';
import CustomText from '../CustomText/index';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const StyledHeader = styled('div')({
  width: '100%',
  height: '57px',
  backgroundColor: '#ffff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SubWrapper = styled('div')({
  height: '100%',
  width: '100%',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const LeftComp = styled('div')({
  justifyContent: 'flex-start',
});
const RightComp = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});
const Content = styled('div')({});

const Header = ({ onClickLogoutButton, logoutEnable, loginStatus }) => {
  const history = useHistory();
  const onClickSignup = () => {
    // history.push(`/signup/${37}/isClient=false`);
    // history.push(`/signup/${40}`);
    history.push('/');
  };
  return (
    <StyledHeader>
      <Container>
        <SubWrapper>
          <LeftComp>
            <img style={{ width: '100%' }} src={csmartNewLogo} alt="csmart" />
          </LeftComp>
          <RightComp>
            {loginStatus ? (
              <Content
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Content style={{ width: '65%' }}>
                  <CustomText fontSize="18px" color={' #0898be'}>
                    If You are a new user?
                  </CustomText>
                </Content>
                <Content style={{ width: '35%' }}>
                  <ButtonComponent
                    height={'35px'}
                    width={'100px'}
                    fontSize={'18px'}
                    labelColor={' #0898be'}
                    onClick={onClickSignup}
                  >
                    Sign Up
                  </ButtonComponent>
                </Content>
              </Content>
            ) : logoutEnable ? (
              <ButtonComponent
                height={'35px'}
                width={'100px'}
                fontSize={'18px'}
                labelColor={' #0898be'}
                onClick={onClickLogoutButton}
              >
                Logout
              </ButtonComponent>
            ) : (
              <Content
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Content style={{ width: '75%' }}>
                  <CustomText fontSize="18px" color={' #0898be'}>
                    Already registered with Csmart DX ?
                  </CustomText>
                </Content>
                <Content style={{ width: '25%' }}>
                  <ButtonComponent
                    height={'35px'}
                    width={'100px'}
                    fontSize={'18px'}
                    labelColor={' #0898be'}
                    onClick={onClickLogoutButton}
                  >
                    Login
                  </ButtonComponent>
                </Content>
              </Content>
            )}
          </RightComp>
        </SubWrapper>
      </Container>
    </StyledHeader>
  );
};

Header.propTypes = {
  onClickLogoutButton: PropTypes.func,
  logoutEnable: PropTypes.bool,
  loginStatus: PropTypes.bool,
};

export default Header;
