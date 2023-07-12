import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import loginimage from '../../assets/background.png';
import CardComponent from '../../components/common/CardComponent';
import CustomText from '../../components/common/CustomText';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import DropDownComponent from '../../components/common/DropdownComponent';
import CheckBoxComponent from '../../components/common/CheckboxComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import MainScreen from '../../components/common/MainScreen';
import CloseIcon from '@material-ui/icons/Close';
import FormSubmit from '../../assets/FormSubmit.png';
import Loader from '../../components/common/loader';
import {
  getClientDetails,
  setgetClientDetails,
} from '../../redux/actions/getClientDetails';
import { connect } from 'react-redux';
import { signUp, setSignUp } from '../../redux/actions/signUp';
import IconButtonComponent from '../../components/common/IconComponent';
import LinkComponent from '../../components/common/LinkComponent';
import GearIcon from '../../assets/gear.png';
import { Container } from '@material-ui/core';
import RadioButton from '../../components/common/Radio';
import { withRouter } from 'react-router';
import { getSignUp } from '../../redux/actions/getSignup';
import { getTenantInfo } from '../../redux/actions/getTenantInfo';

const MainDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundImage: `url(${loginimage})`,
});
const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
});

const LeftWrapper = styled('div')({});
const RightWrapper = styled('div')({});
const SubWrapper2 = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'center',
});
const ContentImage = styled('div')({
  backgroundImage: `url(${FormSubmit})`,
  width: ' 128.7px',
  height: '100.6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundRepeat: 'no-repeat',
});
const Content = styled('div')({});

const MainContent = styled('div')({
  overflowY: 'scroll',
  height: '503px',
  scrollbarWidth: 'thin',
  marginTop: '10px',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'white',
    outline: '1px solid slategrey',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'white',
  },
});

class SignUp extends Component {
  state = {
    partnerNameError: false,
    partnerNameErrorMessage: '',
    partnerName: '',
    secreatKeyError: false,
    secreatKey: '',
    passwordError: '',
    passwordErrorMessage: '',
    password: '',
    confirmPasswordError: false,
    confirmPasswordErrorMessage: '',
    confirmPassword: '',
    emailError: false,
    email: '',
    emailErrorMessage: '',
    contactNumberError: false,
    contactNumberErrorMessage: '',
    contactNumber: '',
    addressError: '',
    addressErrorMessage: '',
    address: '',
    clientList: [],
    clientName: '',
    clientNameError: false,
    clientNameErrorMessage: '',
    locationError: false,
    location: '',
    agreeCheckedError: false,
    agreeChecked: false,
    agreeCheckedMessage: '',
    getClientApi: true,
    signUpApi: true,
    successOpen: false,
    termConditionEnable: false,
    signUp: false,
    radio: 'client',
    responseData: {
      id: 5,
      clientId: 'GSB-SIN',
      partnerName: 'Google',
      location: 'Australia',
      status: 'pending',
    },
    getSignUpApi: true,
    messagepartnerId: '',
  };
  componentDidMount() {
    if (this.props.location.pathname.includes('isClient=false')) {
      this.props.getTenantInfo(false, this.props.match.params.flag);
      this.setState({ radio: 'partner' });
    } else {
      this.props.getTenantInfo(true, this.props.match.params.flag);
      this.setState({ radio: 'client' });
    }
    this.props.getClientDetails();
  }

  signUpSubmit = () => {
    /* eslint-disable */
    const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const mailFormatValue = mailformat.test(this.state.email);
    const validMobileNumber = /^\d{10}$/.test(this.state.contactNumber);
    // var partnerNamePattren = /^[a-zA-Z ]*$/.test(
    //   String(this.state.partnerName).toLowerCase(),
    // );
    if (this.state.partnerName === '') {
      this.setState({ partnerNameError: true });
      this.setState({ partnerNameErrorMessage: 'PartnerName is required' });
    }
    // else if (this.state.email !== '' && partnerNamePattren !== true) {
    //   this.setState({ partnerNameError: true });
    //   this.setState({ partnerNameErrorMessage: 'Only Characters allowed' });
    // }
    else if (this.state.secreatKey === '') {
      this.setState({ secreatKeyError: true });
      this.setState({ secreatKeyErrorMessage: 'SecretKey is required' });
    } else if (this.state.password === '') {
      this.setState({ passwordError: true });
      this.setState({ passwordErrorMessage: 'Please Enter password' });
    } else if (this.state.confirmPassword === '') {
      this.setState({ confirmPasswordError: true });
      this.setState({ confirmPasswordErrorMessage: 'Password unmatched' });
    } else if (this.state.email === '') {
      this.setState({ emailError: true });
      this.setState({ emailErrorMessage: 'Email is required' });
    } else if (this.state.email !== '' && mailFormatValue !== true) {
      this.setState({ emailError: true });
      this.setState({ emailErrorMessage: 'This email address is not valid' });
    } else if (this.state.contactNumber === '') {
      this.setState({ contactNumberError: true });
      this.setState({ contactNumberErrorMessage: 'ContactNumber is required' });
    } else if (this.state.contactNumber !== '' && validMobileNumber !== true) {
      this.setState({ contactNumberError: true });
      this.setState({
        contactNumberErrorMessage: 'This contact number is not valid',
      });
    } else if (this.state.address === '') {
      this.setState({ addressError: true });
      this.setState({ addressErrorMessage: 'Address is required' });
    } else if (this.state.clientName === '' && this.state.radio === 'partner') {
      this.setState({ clientNameError: true });
    } else if (this.state.location === '') {
      this.setState({ locationError: true });
    } else if (!this.state.agreeChecked) {
      this.setState({ agreeCheckedError: true });
      this.setState({ agreeCheckedMessage: 'Accept the terms and conditions' });
    } else {
      let req;
      if (this.state.radio === 'partner') {
        req = {
          clientId: this.state.clientId,
          partnerName: this.state.partnerName,
          location: this.state.location,
          secretKey: this.state.secreatKey,
          password: this.state.password,
          // status: 'pending', // backend
          emailId: this.state.email,
          address: this.state.address,
          contactNumber: this.state.contactNumber,
          isAdminOnBoarding: false,
        };
      } else {
        req = {
          clientName: this.state.partnerName,
          location: this.state.location,
          secretKey: this.state.secreatKey,
          password: this.state.password,
          emailId: this.state.email,
          address: this.state.address,
          contactNumber: this.state.contactNumber,
          isAdminOnBoarding: false,
        };
      }
      console.log('request', req);
      this.setState({ signUp: true });
      if (this.state.radio === 'partner') {
        this.props.signUp('partner', req);
      } else {
        this.props.signUp('client', req);
      }
      this.setState({ signUpApi: true });
    }
  };
  handleChangeCheckbox = (e) => {
    this.setState({ agreeCheckedError: false });
    this.setState({ agreeChecked: e.target.checked });
  };
  signUpOperation = () => {
    if (
      this.props.signUpInfo !== undefined &&
      this.props.signUpInfo.data.status != null
    ) {
      if (this.state.signUpApi) {
        this.setState({ signUp: false });
        this.setState({ signUpApi: false });
        if (
          this.props.signUpInfo.data != null &&
          this.props.signUpInfo.data !== undefined
        ) {
          if (this.props.signUpInfo.data.status === 'success') {
            this.setState({ successOpen: true });
            if (this.state.radio === 'partner') {
              this.setState({
                partnerStatus: this.props.signUpInfo.data.partnerStatus,
              });
              this.setState({
                messagepartnerId: this.props.signUpInfo.data.partnerId,
              });
            } else {
              this.setState({
                messagepartnerId: this.props.signUpInfo.data.clientId,
              });
              this.setState({
                partnerStatus: this.props.signUpInfo.data.clientStatus,
              });
            }
            this.setState({ message: this.props.signUpInfo.data.message });
            this.setState({
              messagesecretKey: this.props.signUpInfo.data.secretKey,
            });
            this.props.setSignUp();
          } else {
            this.setState({ open: true });
            this.setState({ message: 'logged in failed' });
            this.props.setSignUp();
          }
        }
      }
    }
  };
  handleChange = (e) => {
    switch (e.target.name) {
      case 'partnerName':
        this.setState({ partnerNameError: false });
        break;
      case 'secreatKey':
        this.setState({ secreatKeyError: false });
        break;
      case 'password':
        this.setState({ passwordError: false });
        break;
      case 'confirmPassword':
        this.setState({ confirmPasswordError: false });
        break;
      case 'email':
        this.setState({ emailError: false });
        break;
      case 'contactNumber':
        this.setState({ contactNumberError: false });
        break;
      case 'address':
        this.setState({ addressError: false });
        break;
      case 'location':
        this.setState({ locationError: false });
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

  handleLink = () => {
    this.setState({ termConditionEnable: true });
  };
  getClientDetailsOperation = () => {
    let tempArry = [];
    if (this.props.getClientDetailsInfo !== undefined) {
      if (this.props.getClientDetailsInfo.data !== undefined) {
        if (this.state.getClientApi) {
          this.setState({ getClientApi: false });
          if (this.props.getClientDetailsInfo.data.status === 'success') {
            this.props.getClientDetailsInfo.data.clientNames.map(
              (data, idx) => {
                let tempvalue = {
                  label: data,
                  value: data,
                };
                tempArry.push(tempvalue);
              },
            );
            this.setState({ clientList: tempArry });
          }
        }
      }
    }
  };
  onCloseSuccess = () => {
    this.setState({ successOpen: false });
    this.setState({ signUpApi: true });
    this.props.setSignUp();
    this.setState({ partnerName: '' });
    this.setState({ secreatKey: '' });
    this.setState({ password: '' });
    this.setState({ confirmPassword: '' });
    this.setState({ email: '' });
    this.setState({ contactNumber: '' });
    this.setState({ address: '' });
    this.setState({ clientName: '' });
    this.setState({ location: '' });
  };
  dropDownOnchangeFun = (e) => {
    this.setState({ clientNameError: false });
    this.setState({ clientName: e.target.value });
  };
  onClickLoginButton = () => {
    this.props.history.push('/login');
  };
  termsFunction = () => {
    this.setState({ termConditionEnable: false });
  };
  radioHandler = (val, id) => {
    this.setState({ radio: val });
  };
  getSignUpDataFunc = () => {
    if (this.props.getSignUpData !== undefined) {
      if (this.props.getSignUpData.data !== undefined) {
        if (this.state.getSignUpApi) {
          this.setState({ getSignUpApi: false });
          if (this.props.getSignUpData.status === 200) {
            if (this.props.getSignUpData.config.url.includes('isClient=true')) {
              this.setState({
                partnerName: this.props.getSignUpData.data.firstName,
              });
              this.setState({
                location: this.props.getSignUpData.data.country,
              });
              this.setState({ email: this.props.getSignUpData.data.email });
            } else {
              this.setState({
                partnerName: this.props.getSignUpData.data.firstName,
              });
              this.setState({
                location: this.props.getSignUpData.data.country,
              });
              this.setState({
                clientName: this.props.getSignUpData.data.lastName,
              });
              this.setState({
                clientId: this.props.getSignUpData.data.clientId,
              });
              this.setState({ email: this.props.getSignUpData.data.email });
            }
          }
        }
      }
    }
  };

  mainContent = () => {
    const signUpOptions = [
      { id: 'client', label: 'Client', value: 'client' },
      { id: 'partner', label: 'Partner', value: 'partner' },
    ];
    return (
      <MainDiv>
        <Container>
          <SubWrapper>
            <LeftWrapper>
              <img src={GearIcon} />
            </LeftWrapper>
            <RightWrapper>
              <CardComponent
                height={'700px'}
                backGroundcolor={'rgba(255, 255, 255, 0.3)'}
                marginLeft={'33px'}
                marginTop={'4px'}
              >
                <Box marginBottom="5px">
                  <CustomText fontSize={'30px'}>Sign Up</CustomText>
                </Box>
                <Box marginBottom="-6px">
                  {this.props.match.params.flag !== undefined ? (
                    <RadioButton
                      variant="h6"
                      labelColor="#4b485e"
                      label="Select type "
                      textcolor={'#ffffff'}
                      value={this.state.radio}
                      radioGroupValues={signUpOptions}
                      onChange={(val, id) => this.radioHandler(val, id)}
                    />
                  ) : (
                    ''
                  )}
                </Box>
                {this.state.radio !== '' ? (
                  <Box>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label={
                          this.state.radio === 'partner'
                            ? 'Partner Name'
                            : 'ClientId Name'
                        }
                        error={this.state.partnerNameError}
                        helperText={this.state.partnerNameErrorMessage}
                        type={'text'}
                        name="partnerName"
                        value={this.state.partnerName}
                        onChange={this.handleChange}
                        disabled={
                          this.props.match.params.flag !== undefined
                            ? true
                            : false
                        }
                      ></TextBoxComponent>
                    </Content>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Secret Key*"
                        error={this.state.secreatKeyError}
                        helperText={this.state.secreatKeyErrorMessage}
                        value={this.state.secreatKey}
                        onChange={this.handleChange}
                        type="password"
                        name="secreatKey"
                      ></TextBoxComponent>
                    </Content>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Password*"
                        type="password"
                        error={this.state.passwordError}
                        helperText={this.state.passwordErrorMessage}
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      ></TextBoxComponent>
                    </Content>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Confirm Password*"
                        type="password"
                        error={this.state.confirmPasswordError}
                        helperText={this.state.confirmPasswordErrorMessage}
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                      ></TextBoxComponent>
                    </Content>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Email*"
                        error={this.state.emailError}
                        helperText={this.state.emailErrorMessage}
                        type={'text'}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        disabled={
                          this.props.match.params.flag !== undefined
                            ? true
                            : false
                        }
                      ></TextBoxComponent>
                    </Content>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Contact Number*"
                        error={this.state.contactNumberError}
                        helperText={this.state.contactNumberErrorMessage}
                        type={'text'}
                        name="contactNumber"
                        value={this.state.contactNumber}
                        onChange={this.handleChange}
                      ></TextBoxComponent>
                    </Content>
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Address*"
                        error={this.state.addressError}
                        helperText={this.state.addressErrorMessage}
                        type={'text'}
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                      ></TextBoxComponent>
                    </Content>
                    {this.props.match.params.flag !== undefined &&
                    this.state.radio === 'partner' ? (
                      <Content style={{ marginTop: '3px' }}>
                        <TextBoxComponent
                          label="Client Name*"
                          error={this.state.clientNameError}
                          helperText={'Enter client name'}
                          type={'text'}
                          name="clientName"
                          value={this.state.clientName}
                          onChange={this.handleChange}
                          disabled={
                            this.props.match.params.flag !== undefined
                              ? true
                              : false
                          }
                        ></TextBoxComponent>
                      </Content>
                    ) : (
                      ''
                    )}
                    <Content style={{ marginTop: '3px' }}>
                      <TextBoxComponent
                        label="Location*"
                        error={this.state.locationError}
                        helperText="Location is mandatory"
                        type={'text'}
                        name="location"
                        value={this.state.location}
                        onChange={this.handleChange}
                        disabled={
                          this.props.match.params.flag !== undefined
                            ? true
                            : false
                        }
                      ></TextBoxComponent>
                    </Content>

                    <Content
                      style={{
                        marginTop: '3px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: '-11px',
                      }}
                    >
                      <Content style={{ marginTop: '3px' }}>
                        <CheckBoxComponent
                          error={this.state.agreeCheckedError}
                          checked={this.state.agreeChecked}
                          onClick={(e) => this.handleChangeCheckbox(e)}
                          name={'agreeChecked'}
                        />
                      </Content>
                      <Content style={{}}>
                        <CustomText fontSize={'16px'} color="white">
                          I agree to
                        </CustomText>
                      </Content>
                      <Content style={{ marginLeft: '6px', marginTop: '0px' }}>
                        <LinkComponent onClick={this.handleLink}>
                          Csmart Terms & Conditions
                        </LinkComponent>
                      </Content>
                    </Content>

                    <Content style={{ height: '21px' }}>
                      {this.state.agreeCheckedError ? (
                        <CustomText color="red" fontSize={'13px'}>
                          {this.state.agreeCheckedMessage}
                        </CustomText>
                      ) : (
                        ''
                      )}
                    </Content>

                    <ButtonComponent
                      label="Sign Up"
                      height={'40.1px'}
                      width={'108.4px'}
                      fontSize={'18px'}
                      backgroundColor={'white'}
                      hoverColor={'white'}
                      labelColor={'#0898be'}
                      onClick={this.signUpSubmit}
                    >
                      Sign Up
                    </ButtonComponent>
                  </Box>
                ) : (
                  ''
                )}
              </CardComponent>
            </RightWrapper>
          </SubWrapper>
        </Container>
      </MainDiv>
    );
  };
  mainSubmission = () => {
    return (
      <MainDiv>
        <Container>
          <SubWrapper2>
            <Content
              style={{
                marginTop: '53px',
                alignSelf: 'stretch',
                display: 'flex',
              }}
            >
              <CardComponent
                height={'272px'}
                backGroundcolor={'rgba(255, 255, 255, 0.3)'}
                marginTop={'16px'}
              >
                <Content
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Content
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginLeft: '414px',
                      marginTop: '-7px',
                    }}
                  >
                    <IconButtonComponent onClick={this.onCloseSuccess}>
                      <CloseIcon />
                    </IconButtonComponent>
                  </Content>
                  <ContentImage />
                  <CustomText fontSize={'20px'} fontWeight={'bold'}>
                    Your details have been submitted successfully
                  </CustomText>
                  <div
                    style={{
                      'text-decoration': 'overline',
                      width: '269px',
                      border: 'solid 1px #ffffff',
                      marginTop: '14px',
                    }}
                  ></div>

                  <CustomText
                    color={'white'}
                    style={{ marginTop: '4px' }}
                    fontSize={'16px'}
                    bold={'bold'}
                  >
                    Partner Id : {this.state.messagepartnerId}
                  </CustomText>
                  <CustomText
                    color={'white'}
                    style={{ marginTop: '4px' }}
                    fontSize={'16px'}
                    bold={'bold'}
                  >
                    Status : {this.state.partnerStatus}
                  </CustomText>
                  {/* <CustomText
                    color={'white'}
                    style={{ marginTop: '4px' }}
                    fontSize={'16px'}
                    bold={'bold'}
                  >
                    Secret Key : {this.state.messagesecretKey}
                  </CustomText> */}
                </Content>
              </CardComponent>
            </Content>
          </SubWrapper2>
        </Container>
      </MainDiv>
    );
  };
  terms = () => {
    return (
      <MainDiv>
        <Container>
          <SubWrapper2>
            <CardComponent
              height={'600px'}
              width={'700px'}
              backGroundcolor={'rgba(255, 255, 255, 0.1)'}
              marginLeft={'33px'}
            >
              <Content
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0px',
                }}
              >
                <CustomText fontSize={'30px'} fontWeight={'bold'}>
                  Terms And Conditions
                </CustomText>
                <Content style={{ marginRight: '27px' }}>
                  <IconButtonComponent onClick={this.termsFunction}>
                    <CloseIcon />
                  </IconButtonComponent>
                </Content>
              </Content>

              <MainContent>
                <Content>
                  <CustomText color={'White'} fontSize={'16px'}>
                    By using the API access application, these terms will
                    automatically apply to you – you should make sure therefore
                    that you read them carefully before using the application.
                    We are offering you this application to access our APIs, but
                    you should be aware that you not allowed to copy, or modify
                    the content, any part of the application, or our trademarks
                    in any way. You are not allowed to make any derivative
                    versions. The application itself, and all the trademarks,
                    copyright, database rights and other intellectual property
                    rights related to it, still belong to Csmart.
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    Csmart team is committed to ensuring that the app is as
                    useful and efficient as possible. For that reason, we
                    reserve the right to make changes to the applications and
                    the APIs at any time and for any reason.
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    Csmart grants you a limited, nonexclusive permission to
                    access and use the APIs: (i) to develop, test and support
                    your Application; and (ii) to enable end users of your
                    Application to connect to and communicate with the
                    applicable Services. You are not permitted to access or use
                    the APIs beyond the scope of the description agreed during
                    Application registration that has been accepted by Csmart.
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    By using Csmart APIs, you agree not to: (i) modify, prepare
                    derivative works of, or reverse engineer, our APIs,
                    Services, or technology; (ii) use our APIs or Services in a
                    way that abuses or disrupts our security systems or the
                    Services(iii) access or use the APIs for fraudulent or
                    illegal purposes (iv) market, sell, or resell the APIs to
                    any third party; (v) use the Services in violation of our
                    policies, applicable laws, or regulations; (vi) use the APIs
                    in any application, product, or service that competes with
                    any application, product, or Service offered by Csmart, or
                    to otherwise divert Csmart customers or potential customers
                    from the Services{' '}
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    Security and Privacy - You should implement appropriate,
                    industry standard, secure coding, privacy-by-design when
                    designing your products with an intention to protect any
                    information accessible, hosted, or transferred from either
                    Csmart Services or any third-party service/product to which
                    this API connects. Csmart reserves the right to test,
                    validate, and/or inquire about your API use consistent with
                    the requirements herein. If any malicious activity happened
                    using these APIs with malpractice of the third-party system,
                    then it is not the responsibility of the Csmart on the data
                    privacy.
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    Termination- Csmart reserves the right, in its sole
                    discretion, and at any time, to change, suspend, or
                    discontinue any API or suspend or terminate your rights to
                    access or use the APIs or display the Csmart Brands. You may
                    stop use of the APIs and terminate these Terms at any time
                    by closing your account and ceasing all access and use of
                    the APIs.{' '}
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    Independent Development- You understand and acknowledge that
                    Csmart may from time to time independently create
                    applications, products, or services that are like or
                    competitive with your applications, products, or services,
                    and nothing in these Terms will be construed as restricting
                    or preventing Csmart from doing so, and that such activity
                    will create no obligation to you.
                  </CustomText>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <CustomText color={'White'} fontSize={'16px'}>
                    Confidentiality - Unless expressly authorized in writing by
                    Csmart, you shall not disclose to any third party any
                    Confidential Information of Csmart or use such Confidential
                    Information.
                  </CustomText>
                </Content>
              </MainContent>
            </CardComponent>
          </SubWrapper2>
        </Container>
      </MainDiv>
    );
  };
  render() {
    return (
      <MainScreen
        logoutEnable={false}
        login={true}
        onClickLogoutButton={this.onClickLoginButton}
      >
        {this.state.termConditionEnable
          ? this.terms()
          : !this.state.successOpen
          ? this.mainContent()
          : this.mainSubmission()}

        {Object.keys(this.props.getClientDetailsInfo).length > 0
          ? this.getClientDetailsOperation()
          : ''}
        {Object.keys(this.props.signUpInfo).length > 0
          ? this.signUpOperation()
          : ''}
        {this.state.signUp ? <Loader open={this.state.signUp} /> : ''}
        {/* {Object.keys(this.props.getSignUpData).length > 0
          ? this.getSignUpDataFunc()
          : ''} */}
        {/* {Object.keys(this.props.match.params).length > 0
          ? this.getSignUpDataFunc()
          : ''} */}
        {this.props.getSignUpData && this.props.getSignUpData
          ? this.getSignUpDataFunc()
          : ''}
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signUpInfo: state.signup,
    getClientDetailsInfo: state.getClientDetails,
    // getSignUpData: state.getSignUp,
    getSignUpData: state.getTenantInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (x, y) => dispatch(signUp(x, y)),
    setSignUp: () => dispatch(setSignUp()),
    getClientDetails: () => dispatch(getClientDetails()),
    setgetClientDetails: () => dispatch(setgetClientDetails()),
    // getSignUp: () => dispatch(getSignUp()),
    getTenantInfo: (x, y) => dispatch(getTenantInfo(x, y)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
