import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import CardComponent from '../../components/common/CardComponent';
import CustomText from '../../components/common/CustomText';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import Loader from '../../components/common/loader';
import forgotImage from '../../assets/background.png';
import ButtonComponent from '../../components/common/ButtonComponent';
import MainScreen from '../../components/common/MainScreen';
import { connect } from 'react-redux';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import GearIcon from '../../assets/gear.png';
import { Container } from '@material-ui/core';
import {
  forgotPassword,
  setForgotPassword,
} from '../../redux/actions/forgotPassword';

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
  backgroundImage: `url(${forgotImage})`,
});

const LeftWrapper = styled('div')({});
const RightWrapper = styled('div')({});
const Content = styled(`div`)({});

class ForgotPassword extends Component {
  state = {
    partnerIdError: false,
    partnerIdErrorMessage: '',
    partnerId: '',
    forgotPassApiStatus: true,
    open: false,
    login: false,
    secreteKey: '',
    secreteKeyError: false,
    secreteKeyErrorMessage: '',
  };
  handleChange = (e) => {
    this.setState({ partnerIdError: false });
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
  apiResponseOperation = () => {
    if (
      this.props.forgotPasswordResponse !== undefined &&
      this.props.forgotPasswordResponse.data.status !== null
    ) {
    }
  };

  forgotPasswordSubmit = () => {
    if (this.state.partnerId === '') {
      this.setState({ partnerIdError: true });
      this.setState({ partnerIdErrorMessage: 'ParnerId is mandatory' });
    } else if (this.state.secreteKey === '') {
      this.setState({ secreteKeyrror: true });
      this.setState({ secreteKeyErrorMessage: 'ParnerId is mandatory' });
    } else {
      let req = {
        type:
          localStorage.getItem('clientStatus') === true ? 'client' : 'partner',
        partnerId: this.state.partnerId,
        secreteKey: this.state.secreteKey,
      };
      this.setState({ login: true });
      this.setState({ forgotPassApiStatus: true });
      this.props.forgotPassword('forgotPassword', req);
      this.props.history.push('/forgotPassowrd/MVNO_VT_VIJ/client');
    }
  };
  onClickForgot = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <MainScreen onClickLogoutButton={this.onClickForgot} loginStatus={true}>
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
                  <CustomText fontSize={'30px'}>Forgot Password</CustomText>
                  <Content style={{ marginTop: '20px' }}>
                    <TextBoxComponent
                      label="Login Id*"
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
                      label="Secrete Key*"
                      error={this.state.secreteKeyError}
                      helperText={this.state.secreteKeyErrorMessage}
                      type={'text'}
                      name="secreteKey"
                      value={this.state.secreteKey}
                      onChange={this.handleChange}
                    ></TextBoxComponent>
                  </Content>
                  <Content style={{ marginTop: '40px' }}>
                    <ButtonComponent
                      height={'40.1px'}
                      width={'108.4px'}
                      fontSize={'18px'}
                      backgroundColor={'white'}
                      hoverColor={'white'}
                      labelColor={'#0898be'}
                      onClick={this.forgotPasswordSubmit}
                    >
                      Submit
                    </ButtonComponent>
                  </Content>
                </CardComponent>
                {Object.keys(this.props.forgotPasswordResponse).length > 0
                  ? this.apiResponseOperation()
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
    forgotPasswordResponse: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (x, y) => dispatch(forgotPassword(x, y)),
    setForgotPassword: () => dispatch(setForgotPassword()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
