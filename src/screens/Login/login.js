import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import CardComponent from '../../components/common/CardComponent';
import CustomText from '../../components/common/CustomText';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import Loader from '../../components/common/loader';
import loginimage from '../../assets/background.png';
import ButtonComponent from '../../components/common/ButtonComponent';
import MainScreen from '../../components/common/MainScreen';
import { connect } from 'react-redux';
import { loginUser, setLoginData } from '../../redux/actions/login';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import GearIcon from '../../assets/gear.png';
import { Box, Container } from '@material-ui/core';
import RadioButton from '../../components/common/Radio';
import Link from '@material-ui/core/Link';
import { logoutUser } from '../../redux/actions/logout';

const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
});
const MainDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundImage: `url(${loginimage})`,
});

const LeftWrapper = styled('div')({});
const RightWrapper = styled('div')({});
const Content = styled(`div`)({});

class Login extends Component {
  state = {
    partnerIdError: false,
    partnerIdErrorMessage: '',
    partnerId: '',
    passwordError: false,
    passwordErrorMessage: '',
    password: '',
    loginApiStatus: true,
    open: false,
    login: false,
    radio: 'client',
  };
  componentDidMount() {
    // console.log(
    //   localStorage.getItem('access_token'),
    //   "localStorage.getItem('access_token')",
    // );
    // console.log(localStorage.length());
    // if (
    //   localStorage.getItem('access_token') !== null ||
    //   localStorage.getItem('access_token') !== undefined
    // ) {
    //   localStorage.clear();
    //   this.props.logoutUser();
    // }
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case 'partnerId':
        this.setState({ partnerIdError: false });
        break;
      case 'password':
        this.setState({ passwordError: false });
        break;
      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.setState({ message: '' });
  };
  handleClick = () => {
    this.setState({ open: true });
  };
  loginOperation = () => {
    if (
      this.props.loginInfo !== undefined &&
      this.props.loginInfo.data.status !== null
    ) {
      if (this.state.loginApiStatus) {
        this.setState({ login: false });
        this.setState({ loginApiStatus: false });
        if (
          this.props.loginInfo.data !== null &&
          this.props.loginInfo.data !== undefined
        ) {
          if (
            this.props.loginInfo.data.status === 'success' &&
            this.props.loginInfo.data.partnerStatus === 'approved'
          ) {
            localStorage.setItem(
              'access_token',
              this.props.loginInfo.data.accessToken,
            );
            localStorage.setItem('partner_id', this.state.partnerId);
            localStorage.setItem(
              'partner_status',
              this.props.loginInfo.data.partnerStatus,
            );
            localStorage.setItem(
              'generated_tokens',
              JSON.stringify(this.props.loginInfo.data.generatedTokens),
            );
            if (this.state.radio === 'partner') {
              this.props.history.push('/home');
            } else if (this.state.radio === 'client') {
              localStorage.setItem('clientStatus', true);
              this.props.history.push('/home');
            }
            this.props.setLoginData();
          } else if (
            this.props.loginInfo.data.status === 'success' &&
            this.props.loginInfo.data.partnerStatus === 'pending'
          ) {
            localStorage.setItem(
              'access_token',
              this.props.loginInfo.data.accessToken,
            );
            localStorage.setItem('partner_id', this.state.partnerId);
            localStorage.setItem(
              'partner_status',
              this.props.loginInfo.data.partnerStatus,
            );
            localStorage.setItem(
              'generated_tokens',
              JSON.stringify(this.props.loginInfo.data.generatedTokens),
            );
            this.props.history.push('/home', {
              partnerId: this.state.partnerId,
              partnerStatus: this.props.loginInfo.data.partnerStatus,
              message: this.props.loginInfo.data.message,
              generatedTokens: this.props.loginInfo.data.generatedTokens,
            });
            this.props.setLoginData();
          } else {
            this.setState({ open: true });
            this.setState({ message: 'logged in failed' });
            this.props.setLoginData();
          }
        }
      }
    }
  };
  loginSubmit = () => {
    let req;
    if (this.state.partnerId === '') {
      this.setState({ partnerIdError: true });
      this.setState({ partnerIdErrorMessage: 'ParnerId is mandatory' });
    } else if (this.state.password === '') {
      this.setState({ passwordError: true });
      this.setState({ passwordErrorMessage: 'Password is mandatory' });
    } else {
      this.state.radio === 'partner'
        ? (req = {
            tenancyId: this.state.partnerId,
            password: this.state.password,
            isClient: false,
          })
        : (req = {
            tenancyId: this.state.partnerId,
            password: this.state.password,
            isClient: true,
          });

      this.setState({ login: true });
      this.props.loginUser(req);
      this.setState({ loginApiStatus: true });
    }
  };
  onClickSignUp = () => {
    this.props.history.push('/');
  };
  radioHandler = (val, id) => {
    this.setState({ radio: val });
  };
  onChangePasswordLink = () => {
    this.props.history.push('/forgotPassword');
  };

  render() {
    const logInOptions = [
      { id: 'client', label: 'Client', value: 'client' },
      { id: 'partner', label: 'Partner', value: 'partner' },
    ];
    return (
      <MainScreen onClickLogoutButton={this.onClickSignUp} loginStatus={true}>
        <MainDiv>
          <Container>
            <SubWrapper>
              <LeftWrapper>
                <img src={GearIcon} alt={GearIcon} />
              </LeftWrapper>
              <RightWrapper>
                <CardComponent
                  height={'350px'}
                  backGroundcolor={'rgba(255, 255, 255, 0.3)'}
                  marginLeft={'33px'}
                >
                  <CustomText fontSize={'30px'}>Login</CustomText>
                  <Box marginBottom="-6px">
                    <RadioButton
                      variant="h6"
                      labelColor="#4b485e"
                      label="Select type "
                      textcolor={'#ffffff'}
                      value={this.state.radio}
                      radioGroupValues={logInOptions}
                      onChange={(val, id) => this.radioHandler(val, id)}
                    />
                  </Box>
                  <Content style={{ marginTop: '10px' }}>
                    <TextBoxComponent
                      label={
                        this.state.radio === 'partner'
                          ? 'Partner Id*'
                          : 'ClientId Id*'
                      }
                      error={this.state.partnerIdError}
                      helperText={this.state.partnerIdErrorMessage}
                      type={'text'}
                      name="partnerId"
                      value={this.state.partnerId}
                      onChange={this.handleChange}
                    ></TextBoxComponent>
                  </Content>
                  <Content style={{ marginTop: '10px' }}>
                    <TextBoxComponent
                      label="Password*"
                      error={this.state.passwordError}
                      helperText={this.state.passwordErrorMessage}
                      showPassword={'password'}
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      position="end"
                      value={this.state.password}
                    ></TextBoxComponent>
                  </Content>
                  <Content
                    style={{
                      marginTop: '40px',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <ButtonComponent
                      height={'40.1px'}
                      width={'108.4px'}
                      fontSize={'18px'}
                      backgroundColor={'white'}
                      hoverColor={'white'}
                      labelColor={'#0898be'}
                      onClick={this.loginSubmit}
                    >
                      Login
                    </ButtonComponent>
                    <Link
                      style={{
                        marginRight: '35px',
                        color: 'white',
                      }}
                      onClick={this.onChangePasswordLink}
                    >
                      Forgot password ?
                    </Link>
                  </Content>
                </CardComponent>
                {Object.keys(this.props.loginInfo).length > 0
                  ? this.loginOperation()
                  : ''}
              </RightWrapper>
              {this.state.open ? (
                <SnackBarComponent
                  open={this.state.open}
                  onClose={this.handleClose}
                  message={this.state.message}
                  iconclose={this.handleClose}
                />
              ) : (
                ''
              )}
              {this.state.login ? <Loader open={this.state.login} /> : ''}
            </SubWrapper>
          </Container>
        </MainDiv>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginInfo: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (x) => dispatch(loginUser(x)),
    setLoginData: () => dispatch(setLoginData()),
    logoutUser: () => dispatch(logoutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
