import { React, Component } from 'react';
import { styled } from '@material-ui/core/styles';
import loginimage from '../../assets/background.png';
import MainScreen from '../../components/common/MainScreen';
import { connect } from 'react-redux';
import { Box, Container, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import CustomText from '../../components/common/CustomText';
import CustomPlanCard from '../../components/common/PackageCard/customPlan-card';
import { moduleList, partnerModuleList } from './statis-data';
import ModalUi from '../../components/common/Modal';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import TextAreaComponent from '../../components/common/TextAreaComponent';
import DropDownComponent from '../../components/common/DropdownComponent';
import {
  postCustomerSignup,
  setCustomerSignup,
} from '../../redux/actions/postCustomerSignup';
import SnackBarComponent from '../../components/common/SnackBarComponent';
const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${loginimage})`,
});
const CardDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  title: {
    marginTop: '30px',
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    // marginBottom: '30px',
  },
  text: {
    marginBottom: '20px',
  },
});
class Home extends Component {
  state = {
    flag: false,
    applicationTypeList: [
      { label: 'App', value: 'app' },
      { label: 'Portal', value: 'portal' },
    ],
    appType: '',
    errorAppTypeFlag: false,
    errorAppNameFlag: false,
    errorAppDescFlag: false,
    appDescription: '',
    applicationName: '',
    applicationRegisterFlag: true,
    messageRegister: '',
    open: false,
  };
  onClick = (id, name) => {
    if (id && name === 'Authentication') {
      this.props.history.push('/accessToken', {
        partnerId: localStorage.getItem('partner_id'),
        partnerStatus: localStorage.getItem('partner_status'),
        generatedTokens: localStorage.getItem('generated_tokens'),
      });
    } else if (id && name === 'Packages') {
      this.props.history.push('/package', {
        partnerId: localStorage.getItem('partner_id'),
      });
    } else if (id && name === 'Transaction History') {
      this.props.history.push('/history');
    } else if (id && name === 'Application Registration') {
      this.setState({ flag: true });
      this.setState({
        appType: '',
        appDescription: '',
        applicationName: '',
      });
    } else if (id === 'partners') {
      this.props.history.push('/dashboard');
    }
  };
  onNo = () => {
    this.setState({ flag: false });
    this.setState({
      appType: '',
      appDescription: '',
      applicationName: '',
    });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.setState({ messageRegister: '' });
  };
  onDropdownChange = (e) => {
    this.setState({ errorAppTypeFlag: false });
    this.setState({ appType: e.target.value });
  };
  handleChange = (e) => {
    if (e.target.name === 'applicationName') {
      this.setState({ errorAppNameFlag: false });
    } else if (e.target.name === 'applicationDescription') {
      this.setState({ errorAppDescFlag: false });
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  applicationRegistration = () => {
    if (this.props.applicationRegister !== undefined) {
      if (this.props.applicationRegister.data !== undefined) {
        if (this.state.applicationRegisterFlag) {
          this.setState({ applicationRegisterFlag: false });
          if (this.props.applicationRegister.data.status === 'success') {
            this.setState({ open: true });
            this.setState({
              messageRegister: this.props.applicationRegister.data.message,
            });
          } else {
            this.setState({ open: true });
            this.setState({
              messageRegister: 'Application Registration Failed',
            });
          }
        }
        this.props.setCustomerSignup();
      }
    }
  };
  submit = () => {
    if (this.state.applicationName === '') {
      this.setState({ errorAppNameFlag: true });
    } else if (this.state.appType === '') {
      this.setState({ errorAppTypeFlag: true });
    } else if (this.state.appDescription === '') {
      this.setState({ errorAppDescFlag: true });
    } else {
      this.setState({ flag: false });
      let reqValue = {
        firstName: this.state.applicationName,
        lastName: '',
        tenancyId: localStorage.getItem('partner_id'),
        segment: 'application',
        status: 'inactive',
        description: this.state.appDescription,
      };
      this.state.appType === 'app'
        ? (reqValue.app = true)
        : (reqValue.portal = true);
      var formData = new FormData();
      formData.append('request', JSON.stringify(reqValue));
      this.props.postCustomerSignup(
        formData,
        localStorage.getItem('partner_id'),
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <SubWrapper>
          <Container>
            <CustomText
              color="#ffff"
              fontSize="30px"
              fontWeight={200}
              className={classes.title}
            >
              Modules
            </CustomText>
            <CardDiv>
              {localStorage.getItem('clientStatus')
                ? moduleList.map((data, idx) => (
                    <CustomPlanCard
                      select={''}
                      label={data.moduleName}
                      onClick={() =>
                        this.onClick(data.moduleId, data.moduleName)
                      }
                      key={idx.toString()}
                      imgFlag={false}
                      localImg={data.localImg}
                    />
                  ))
                : partnerModuleList.map((data, idx) => (
                    <CustomPlanCard
                      select={''}
                      label={data.moduleName}
                      onClick={() =>
                        this.onClick(data.moduleId, data.moduleName)
                      }
                      key={idx.toString()}
                      imgFlag={false}
                      localImg={data.localImg}
                    />
                  ))}
            </CardDiv>
            {this.state.flag && (
              <ModalUi
                title={'Application Registration'}
                isOpen={this.state.flag}
                secondaryText="No"
                onClose={(event) => this.onNo(event)}
                onPrimaryClick={(e) => this.submit(e)}
                primaryText="Submit"
              >
                <Box className={classes.app}>
                  <TextBoxComponent
                    width="250px"
                    error={this.state.errorAppNameFlag}
                    type={'text'}
                    name="applicationName"
                    value={this.state.applicationName}
                    helperText="Enter Application Name"
                    onChange={this.handleChange}
                    label="Application Name"
                    lableColor="#4b485e"
                    borderBottom="1.5px solid #0279a8"
                    className={classes.text}
                  ></TextBoxComponent>
                  <DropDownComponent
                    width="250px"
                    error={this.state.errorAppTypeFlag}
                    helperText="Choose Application Type"
                    label="Application Type"
                    backgroundColor="1.5px solid #0279a8"
                    iconColor="#0279a8"
                    labelColor="#4b485e"
                    dropdownOption={this.state.applicationTypeList}
                    onChange={this.onDropdownChange}
                    value={this.state.appType}
                    className={classes.text}
                  />
                  <TextAreaComponent
                    label="Application Description"
                    error={this.state.errorAppDescFlag}
                    helperText="Enter Application Description"
                    name="appDescription"
                    value={this.state.appDescription}
                    onChange={this.handleChange}
                    bordercolor={'#0279a8'}
                    color={'#4b485e'}
                  />
                </Box>
              </ModalUi>
            )}
            {this.state.open ? (
              <SnackBarComponent
                open={this.state.open}
                onClose={this.handleClose}
                message={this.state.messageRegister}
                iconclose={this.handleClose}
              />
            ) : (
              ''
            )}
          </Container>
          {this.props.applicationRegister ? this.applicationRegistration() : ''}
        </SubWrapper>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    applicationRegister: state.postCustomerSignup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postCustomerSignup: (x, y) => dispatch(postCustomerSignup(x, y)),
    setCustomerSignup: () => dispatch(setCustomerSignup()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(Home);
