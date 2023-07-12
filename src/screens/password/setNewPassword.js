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
import { Container } from '@material-ui/core';
import {
  forgotPassword,
  setForgotPassword,
} from '../../redux/actions/forgotPassword';
// import './newScreen.css';

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

class SetNewPassword extends Component {
  state = {
    login: false,
    passwordError: '',
    passwordErrorMessage: '',
    password: '',
    confirmPasswordError: false,
    confirmPasswordErrorMessage: '',
    confirmPassword: '',
    backgroundColor1: '#4285F4',
    backgroundColor2: '#4285F4',
    passwordLength: false,
    containsNumber: false,
    isUpperCase: false,
    isLowerCase: false,
    containsSymbols: false,
    activeTextColor: false,
    tenancyId: '',
    type: '',
  };
  componentDidMount() {
    console.log('componentDidMount', this.props);
    this.setState({
      tenancyId: this.props.match.params.tenancyId,
      type: this.props.match.params.type,
    });
  }
  handleChanges = (e) => {
    switch (e.target.name) {
      case 'password':
        var pass = e.target.value;
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var test = reg.test(pass);
        if (test) {
          this.setState({ password: pass, activeTextColor: false });
        } else {
          this.setState({ activeTextColor: true });
        }
        break;
      case 'confirmPassword':
        this.setState({ confirmPasswordError: false });
        // var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        // var test = reg.test(this.state.password);
        // if (test) {
        //   this.setState({ passwordError: true });
        // } else {
        //   this.setState({ passwordError: true });
        //   this.setState({ passwordErrorMessage: 'It is not strong Password' });
        // }
        break;
      default:
        break;
    }
    if (e.target.name === 'confirmPassword') {
      if (
        this.state.password === e.target.value &&
        this.state.password !== ''
      ) {
        this.setState({ confirmPasswordError: false });
      } else if (e.target.name === 'password') {
        if (
          this.state.confirmPassword === e.target.value &&
          this.state.confirmPassword !== ''
        ) {
          this.setState({ confirmPasswordError: false });
        }
      } else {
        this.setState({ confirmPasswordError: true });
        this.setState({
          confirmPasswordErrorMessage:
            'Confirm Password is not matching with Password',
        });
      }
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
  apiResponseOperation = () => {};

  passwordSubmit = () => {
    if (this.state.password === '') {
      this.setState({ passwordError: true });
      this.setState({ passwordErrorMessage: '' });
    } else if (this.state.confirmPassword === '') {
      this.setState({ confirmPasswordError: true });
      this.setState({ confirmPasswordErrorMessage: '' });
    } else {
      let req = {
        type: this.state.type,
        tenancyId: this.state.tenancyId,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      };
      this.setState({ signUp: true });
      this.props.forgotPassword('changePassword', req);
      this.setState({ signUpApi: true });
    }
  };

  onClickSignUp = () => {
    this.props.history.push('/login');
  };
  render() {
    let btnStatus =
      this.state.password && this.state.confirmPassword ? false : true;

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
                  height={'400px'}
                  backGroundcolor={'rgba(255, 255, 255, 0.3)'}
                  marginLeft={'33px'}
                >
                  <CustomText fontSize={'30px'}>New Password</CustomText>
                  <Content style={{ marginTop: '40px' }}>
                    <TextBoxComponent
                      label="New Password*"
                      type="password"
                      error={this.state.passwordError}
                      helperText={this.state.passwordErrorMessage}
                      name="password"
                      value={this.state.password}
                      onChange={(e, value) => {
                        this.handleChanges(e, 'password');
                      }}
                    ></TextBoxComponent>
                  </Content>
                  <Content style={{ marginTop: '10px' }}>
                    <TextBoxComponent
                      label="Confirm Password*"
                      type="password"
                      error={this.state.confirmPasswordError}
                      helperText={this.state.confirmPasswordErrorMessage}
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={(e, value) => {
                        this.handleChanges(e, 'confirmPassword');
                      }}
                    ></TextBoxComponent>
                  </Content>
                  {this.state.activeTextColor === true ? (
                    <Content
                      style={{ marginTop: '10px' }}
                      // className={this.state.activeTextColor ? 'green' : null}
                    >
                      The password should be of min 8 characters,have atleast
                      one number, have atleast one uppercase, have atleast one
                      lowercase and have atleast one symbol. Supported symbols
                      !,@,#,$,%,&,*
                    </Content>
                  ) : (
                    ''
                  )}
                  <Content style={{ marginTop: '30px' }}>
                    <ButtonComponent
                      className="Submit"
                      disabled={false}
                      height={'40.1px'}
                      width={'108.4px'}
                      fontSize={'18px'}
                      backgroundColor={'white'}
                      hoverColor={'white'}
                      labelColor={'#0898be'}
                      onClick={this.passwordSubmit}
                    >
                      Submit
                    </ButtonComponent>
                  </Content>
                </CardComponent>
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
        {Object.keys(this.props.setPasswordResponse).length > 0
          ? this.apiResponseOperation()
          : ''}
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    setPasswordResponse: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (x, y) => dispatch(forgotPassword(x, y)),
    setForgotPassword: () => dispatch(setForgotPassword()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);
