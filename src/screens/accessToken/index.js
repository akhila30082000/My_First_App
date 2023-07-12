import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import CardComponent from '../../components/common/CardComponent';
import CustomText from '../../components/common/CustomText';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import MainScreen from '../../components/common/MainScreen';
import { connect } from 'react-redux';
import loginimage from '../../assets/background.png';
import CloseIcon from '@material-ui/icons/Close';
import IconButtonComponent from '../../components/common/IconComponent';
import DropDownComponent from '../../components/common/DropdownComponent';
import TextAreaComponent from '../../components/common/TextAreaComponent';
import {
  generateAccessToken,
  setGenerateAccessToken,
} from '../../redux/actions/generateAccessToken';
import {
  getEnvironmentDetails,
  setgetEnvironmentDetails,
} from '../../redux/actions/getEnvironmentDetails';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import { Box, Container, withStyles } from '@material-ui/core';
import ModalUi from '../../components/common/Modal';
import { compose } from 'redux';
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
  backgroundRepeat: 'no-repeat',
});

const Content = styled(`div`)({});

const useStyles = () => ({ button: { float: 'right ' } });

class AcccessToken extends Component {
  componentDidMount() {
    this.props.getEnvironmentDetails();
  }

  state = {
    successOpen: false,
    environmentValue: '',
    environmentList: [],
    environmentError: false,
    environmentDetailsApi: true,
    setGenerateEnableStatus: false,
    setRegenerateEnableStatus: false,
    setAccesTokenStatus: false,
    dialogOpen: false,
    partnerStatus: localStorage.getItem('partner_status'),
    generatedTokens: JSON.parse(localStorage.getItem('generated_tokens')),
    partnerId: localStorage.getItem('partner_id'),
    genearteTokenApi: true,
    secretKey: '',
    secretErrorMessage: '',
    secretKeyError: false,
    Failureopen: false,
    secreatmessage: '',
    environmentmessage: '',
    failureEnvironmentopen: false,
    partnerError: false,
    message: 'Partner Status not yet approved',
    responseAccessToken: '',
    generatedTokenStatus: '',
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ partnerError: false });
    this.setState({ partnerStatus: '' });
    this.setState({ message: '' });
    this.props.history.push('./login');
  };

  dropDownOnchangeFun = (e) => {
    this.setState({ setGenerateEnableStatus: true });
    this.setState({ environmentError: false });
    if (
      (this.state.generatedTokens !== false &&
        this.state.generatedTokens.length === 0) ||
      this.state.generatedTokens === null
    ) {
      this.setState({ setGenerateEnableStatus: true });
    }
    if (this.state.environmentValue === '') {
      this.setState({ setGenerateEnableStatus: false });
      this.setState({ setRegenerateEnableStatus: false });
    }
    let dataArray = [];
    this.state.generatedTokens !== false &&
      this.state.generatedTokens.map((data) => {
        dataArray.push(data.enviornment);
        if (
          data.enviornment === e.target.value &&
          data.accessTokenGenerated === false
        ) {
          this.setState({ setGenerateEnableStatus: false });
          this.setState({ setRegenerateEnableStatus: false });
          this.setState({ setAccesTokenStatus: true });
          this.setState({ dialogOpen: true });
        } else if (
          data.enviornment === e.target.value &&
          data.accessTokenGenerated === true
        ) {
          this.setState({ setAccesTokenStatus: false });
          this.setState({ setGenerateEnableStatus: false });
          this.setState({ setRegenerateEnableStatus: true });
        }
        return null;
      });
    if (dataArray.includes(e.target.value)) {
    } else {
      this.setState({ setAccesTokenStatus: false });
      this.setState({ setGenerateEnableStatus: true });
      this.setState({ setRegenerateEnableStatus: false });
    }
    this.setState({ environmentError: false });
    this.setState({ environmentValue: e.target.value });
  };
  swaggerDocument = () => {
    window.open(
      'http://192.168.1.71:9080/csmart-crmservices/swagger-ui/index.html?configUrl=/csmart-crmservices/v3/api-docs/swagger-config',
    );
  };
  onClickGenerateaccessToken = () => {
    this.setState({ dialogOpen: true });
    this.setState({ secretKey: '' });
    // this.setState({ environmentValue: "" })
  };
  onCloseSuccess = () => {
    this.setState({ successOpen: false });
    this.setState({ environmentValue: '' });
    this.setState({ setGenerateEnableStatus: false });
    if (this.state.setGenerateEnableStatus) {
      this.props.history.push('./login');
    }
  };

  handleChange = (e) => {
    this.setState({ secretKeyError: false });
    this.setState({ secretKey: e.target.value });
  };
  handleEnvironmentClose = () => {
    this.setState({ failureEnvironmentopen: false });
    this.setState({ environmentmessage: '' });
  };

  generateAccessTokenOperation = () => {
    if (this.props.generateAccessTokenInfo !== undefined) {
      if (this.props.generateAccessTokenInfo.data !== undefined) {
        if (this.state.genearteTokenApi) {
          this.setState({ genearteTokenApi: false });
          if (this.props.generateAccessTokenInfo.data.status === 'success') {
            this.setState({ successOpen: true });
            this.setState({
              responseAccessToken: this.props.generateAccessTokenInfo.data
                .accessToken,
            });
            this.setState({
              generatedTokens: this.props.generateAccessTokenInfo.data
                .generatedTokens,
            });
            this.props.generateAccessTokenInfo.data.generatedTokens.map(
              (data) => {
                if (data.enviornment === this.state.environmentValue) {
                  this.setState({
                    generatedTokenStatus: data.accessTokenGenerated,
                  });
                }
                return null;
              },
            );
            this.setState({
              responseMessage: this.props.generateAccessTokenInfo.data.message,
            });
            this.props.setGenerateAccessToken();
          } else {
            this.setState({ Failureopen: true });
            this.setState({ secreatmessage: 'Valid SecretKey is required' });
            this.props.setGenerateAccessToken();
          }
        }
      }
    }
  };
  environmentDetailsOperation = () => {
    let tempArray = [];
    if (this.props.environmentDetails !== undefined) {
      if (this.props.environmentDetails.data !== undefined) {
        if (this.state.environmentDetailsApi) {
          this.setState({ environmentDetailsApi: false });
          if (this.props.environmentDetails.data.status === 'success') {
            this.props.environmentDetails.data.clientNames.map((data) => {
              let tempValue = {
                label: data,
                value: data,
              };
              tempArray.push(tempValue);
              return null;
            });
            this.setState({
              environmentList: tempArray,
            });
            this.setState({
              responseMessage: this.props.environmentDetails.data.message,
            });
            this.props.setgetEnvironmentDetails();
          } else {
            this.setState({ failureEnvironmentopen: true });
            this.setState({
              environmnetmessage: 'EnvironmentDetails is Empty',
            });
            this.props.setgetEnvironmentDetails();
          }
        }
      }
    }
  };
  handleFailureClose = () => {
    this.setState({ Failureopen: false });
    this.setState({ secreatmessage: '' });
  };
  dialogAction = () => {
    return (
      <ButtonComponent
        backgroundColor={'white'}
        onClick={this.onClickSubmit}
        labelColor={'#0898be'}
        height={'40.1px'}
        width={'108.4px'}
        fontSize={'18px'}
        hoverColor={'white'}
      >
        Submit
      </ButtonComponent>
    );
  };
  onClickSubmit = () => {
    if (this.state.secretKey === '') {
      this.setState({ secretKeyError: true });
      this.setState({ secretErrorMessage: 'SecretKey is mandatory' });
    } else if (this.state.environmentValue === '') {
      this.setState({ environmentError: true });
    } else {
      let req = {
        secretKey: this.state.secretKey,
        tenancyId: this.state.partnerId,
        environment: this.state.environmentValue,
        isClient: localStorage.getItem('clientStatus') ? true : false,
      };
      this.setState({ genearteTokenApi: true });
      this.setState({ environmentDetailsApi: true });
      this.setState({ dialogOpen: false });
      this.props.generateAccessToken(req);
    }
  };
  onClose = () => {
    this.setState({ dialogOpen: false });
    if (this.state.setAccesTokenStatus) {
      this.setState({ setAccesTokenStatus: false });
      this.setState({ environmentValue: '' });
    }
  };

  onNo = () => {
    this.setState({ dialogOpen: false });
  };
  home = () => {
    this.props.history.push('./home');
  };
  render() {
    const { classes } = this.props;
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <MainDiv>
          <Container>
            <SubWrapper>
              {!this.state.successOpen ? (
                <Box width="100%" marginTop="20px">
                  <ButtonComponent
                    boxShadow={'unset'}
                    fontSize={'18px'}
                    backgroundColor={'unset'}
                    hoverColor={'unset'}
                    onClick={this.home}
                    className={classes.button}
                  >
                    <img
                      style={{ height: '25px', width: '25px' }}
                      src={'/static/home.png'}
                      alt={'/static/home.png'}
                    />
                  </ButtonComponent>
                  <Box marginTop="40px" display="flex" justifyContent="center">
                    <CardComponent
                      height={'370px'}
                      backGroundcolor={'rgba(255, 255, 255, 0.3)'}
                    >
                      <Content
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <CustomText fontSize={'30px'} fontWeight={'bold'}>
                          Authentication
                        </CustomText>
                        <div
                          style={{
                            'text-decoration': 'overline',
                            width: '269px',
                            border: 'solid 1px #ffffff',
                            marginTop: '17.5px',
                          }}
                        ></div>
                        <Content style={{ marginTop: '10px' }}>
                          <DropDownComponent
                            dropdownOption={this.state.environmentList}
                            onChange={this.dropDownOnchangeFun}
                            value={this.state.environmentValue}
                            label={'Environment'}
                            error={this.state.environmentError}
                            helperText={'Select Environmnet'}
                          />
                        </Content>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div style={{ marginTop: '24.5px' }}>
                            {this.state.setGenerateEnableStatus === false ||
                            (this.state.partnerStatus !== false &&
                              this.state.partnerStatus === 'pending') ? (
                              <ButtonComponent
                                height={'40.1px'}
                                width={'200px'}
                                fontSize={'18px'}
                                backgroundColor={'#808080'}
                                hoverColor={'white'}
                                labelColor={'white'}
                                onClick={this.onClickGenerateaccessToken}
                                disabled={true}
                              >
                                Generate AccessToken
                              </ButtonComponent>
                            ) : (
                              <ButtonComponent
                                height={'40.1px'}
                                width={'200px'}
                                fontSize={'18px'}
                                backgroundColor={'#fff'}
                                hoverColor={'white'}
                                labelColor={'#0898be'}
                                onClick={this.onClickGenerateaccessToken}
                              >
                                Generate AccessToken
                              </ButtonComponent>
                            )}
                          </div>
                          <div
                            style={{ marginTop: '24.5px', marginLeft: '20px' }}
                          >
                            {this.state.setRegenerateEnableStatus === false ? (
                              <ButtonComponent
                                height={'40.1px'}
                                width={'220px'}
                                fontSize={'18px'}
                                backgroundColor={'#808080'}
                                hoverColor={'white'}
                                labelColor={'white'}
                                disabled={true}
                                onClick={this.onClickGenerateaccessToken}
                              >
                                Regenerate AccessToken
                              </ButtonComponent>
                            ) : (
                              <ButtonComponent
                                height={'40.1px'}
                                width={'220px'}
                                fontSize={'18px'}
                                backgroundColor={'#fff'}
                                hoverColor={'white'}
                                labelColor={'#0898be'}
                                onClick={this.onClickGenerateaccessToken}
                              >
                                Regenerate AccessToken
                              </ButtonComponent>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div
                            style={{ marginTop: '10px', marginLeft: '20px' }}
                          >
                            <ButtonComponent
                              backgroundColor={
                                this.state.setRegenerateEnableStatus
                                  ? 'white'
                                  : '#808080'
                              }
                              fontSize={'18px'}
                              hoverColor={'white'}
                              labelColor={
                                this.state.setRegenerateEnableStatus
                                  ? '#0898be'
                                  : 'white'
                              }
                              height={'40.1px'}
                              width={'220px'}
                              onClick={this.swaggerDocument}
                              disabled={
                                this.state.setRegenerateEnableStatus
                                  ? false
                                  : true
                              }
                            >
                              SwaggerDocument
                            </ButtonComponent>
                          </div>
                        </div>
                      </Content>
                    </CardComponent>
                  </Box>
                  {Object.keys(this.props.generateAccessTokenInfo).length > 0
                    ? this.generateAccessTokenOperation()
                    : ''}
                  {Object.keys(this.props.environmentDetails).length > 0
                    ? this.environmentDetailsOperation()
                    : ''}
                  {this.state.partnerStatus === undefined ||
                  (this.state.partnerStatus !== false &&
                    this.state.partnerStatus === 'pending') ? (
                    <SnackBarComponent
                      open={
                        this.state.partnerStatus !== false &&
                        this.state.partnerStatus === 'pending'
                          ? true
                          : this.state.partnerError
                      }
                      onClose={this.handleClose}
                      message={this.state.message}
                      iconclose={this.handleClose}
                    />
                  ) : (
                    ''
                  )}
                  {this.state.Failureopen ? (
                    <SnackBarComponent
                      open={this.state.Failureopen}
                      onClose={this.handleFailureClose}
                      message={this.state.secreatmessage}
                      iconclose={this.handleFailureClose}
                    />
                  ) : (
                    ''
                  )}
                  {this.state.failureEnvironmentopen ? (
                    <SnackBarComponent
                      open={this.state.failureEnvironmentopen}
                      onClose={this.handleEnvironmentClose}
                      message={this.state.environmentmessage}
                      iconclose={this.handleEnvironmentClose}
                    />
                  ) : (
                    ''
                  )}
                  <ModalUi
                    title={'Generate Access Token'}
                    isOpen={this.state.dialogOpen}
                    secondaryText="No"
                    onClose={(event) => this.onNo(event)}
                    primaryText={
                      !this.state.setAccesTokenStatus ? 'Submit' : ''
                    }
                    onPrimaryClick={this.onClickSubmit}
                  >
                    {this.state.setAccesTokenStatus ? (
                      <CustomText color={'#4b485e'}>
                        Your access token is not yet approved
                      </CustomText>
                    ) : (
                      <Content>
                        <TextBoxComponent
                          label="SecretKey"
                          borderBottom="solid 1px #4b485e"
                          lableColor="#4b485e"
                          error={this.state.secretKeyError}
                          helperText={this.state.secretErrorMessage}
                          type={'text'}
                          name="SecretKey"
                          value={this.state.secretKey}
                          onChange={this.handleChange}
                        ></TextBoxComponent>
                      </Content>
                    )}
                  </ModalUi>
                </Box>
              ) : (
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

                      <CustomText fontSize={'20px'} fontWeight={'bold'}>
                        Authentication
                      </CustomText>
                      <div
                        style={{
                          'text-decoration': 'overline',
                          width: '269px',
                          border: 'solid 1px #ffffff',
                          marginTop: '14px',
                        }}
                      ></div>
                      <Content style={{ marginTop: '6px' }}>
                        <CustomText fontSize={'16px'} fontWeight={'bold'}>
                          Your AccessToken is
                        </CustomText>
                      </Content>
                      <Content style={{ marginTop: '7px' }}>
                        <TextAreaComponent
                          value={this.state.responseAccessToken}
                          fontSize={'16px'}
                        />
                      </Content>
                      {this.state.generatedTokenStatus ? (
                        <Content
                          style={{
                            marginTop: '6px',
                            wordBreak: 'break-all',
                            padding: '5px',
                          }}
                        >
                          <CustomText fontSize={'16px'} fontWeight={'bold'}>
                            You can use this token to access the apis .
                          </CustomText>
                        </Content>
                      ) : (
                        <Content
                          style={{
                            marginTop: '6px',
                            wordBreak: 'break-all',
                            padding: '5px',
                          }}
                        >
                          <CustomText fontSize={'16px'} fontWeight={'bold'}>
                            Your token is not approved , Please wait till it is
                            approved and you can use this token to access the
                            apis
                          </CustomText>
                        </Content>
                      )}
                    </Content>
                  </CardComponent>
                </Content>
              )}
            </SubWrapper>
          </Container>
        </MainDiv>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    generateAccessTokenInfo: state.generateAccessToken,
    environmentDetails: state.getEnvironmentDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateAccessToken: (x) => dispatch(generateAccessToken(x)),
    setGenerateAccessToken: () => dispatch(setGenerateAccessToken()),
    getEnvironmentDetails: () => dispatch(getEnvironmentDetails()),
    setgetEnvironmentDetails: () => dispatch(setgetEnvironmentDetails()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(AcccessToken);
