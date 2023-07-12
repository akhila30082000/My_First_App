import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Header from '../Header';
import Footer from '../Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, setLogoutData } from '../../../redux/actions/logout';
import { useHistory } from 'react-router-dom';

const MainWrapper = styled('div')({
  width: '100%',
  top: '0',
  display: 'flex',
  flexDirection: 'column',
});

const MainScreen = (props) => {
  const [apiFlag, setApiFlag] = useState(true);
  const history = useHistory();

  const onClickLogoutButton = () => {
    props.login ? history.push('/login') : props.logoutUser();
  };

  const logoutInfoFunc = () => {
    if (props.logoutInfo !== undefined) {
      if (props.logoutInfo.status === 200) {
        if (apiFlag) {
          setApiFlag(false);
          history.push('/login');
          localStorage.setItem('access_token', '');
          localStorage.setItem('partner_id', '');
          localStorage.setItem('partner_status', '');
          localStorage.setItem('generated_tokens', '');
          localStorage.setItem('clientStatus', '');
          props.setLogoutData();
        }
      }
    }
  };
  return (
    <MainWrapper>
      <Header
        login={props.login}
        {...props}
        logoutEnable={props.logoutEnable}
        loginStatus={props.loginStatus}
        onClickLogoutButton={onClickLogoutButton}
      />
      {props.children}
      <Footer />
      {props.logoutInfo && props.logoutInfo !== '' ? logoutInfoFunc() : ''}
    </MainWrapper>
  );
};

MainScreen.propTypes = {
  children: PropTypes.element,
  login: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    logoutInfo: state.logoutUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    setLogoutData: () => dispatch(setLogoutData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
