import { Box, Container, Divider, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import backgroundImg from '../../assets/background.png';
import ButtonComponent from '../../components/common/ButtonComponent';
import CustomText from '../../components/common/CustomText';
import MainScreen from '../../components/common/MainScreen';
import CustomPlanCard from '../../components/common/PackageCard/customPlan-card';
import deleteIcon from '../../assets/delete.png';
const useStyles = () => ({
  subWrapper: {
    width: '100%',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'row',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'space-between',
    backgroundImage: `url(${backgroundImg})`,
  },
  payment: {
    border: '1px solid #f2f2f2',
    marginTop: '50px',
    width: '100%',
    height: 'max-content',
    borderRadius: '10px',
  },
  description: {
    padding: '20px',
  },
  commonStyle: { width: '50%' },
  buttonPayment: { marginTop: '20px', float: 'right' },
  delete: { minWidth: '10px', marginLeft: '30px' },
});
class Cart extends Component {
  state = {
    packages:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packageData) ||
      false,
    cost: 0,
  };
  makePayment = (cost) => {
    this.props.history.push('/payment', {
      totalCost: cost,
      packages: this.state.packages,
    });
  };
  delete = (id) => {
    const packages = this.state.packages.filter((item, idx) => idx !== id);
    this.setState({ packages: packages });
  };
  choosePackages = () => {
    this.props.history.push('/availablePackage', {
      choosePackages: true,
      packageData: this.state.packages,
    });
  };
  onClickFunc = (val, costVal, id) => {
    let finalArray = [...this.state.packages];
    let reqObj, index;
    finalArray.map((data, idx) => {
      if (data.packageId === id) {
        index = idx;
        reqObj = {
          ...data,
          cost: '$' + costVal.substring(1) * (val + 1),
        };
      }
      return null;
    });
    finalArray[index] = reqObj;
    this.setState({ packages: finalArray });
  };
  render() {
    let cost = 0;
    const { classes } = this.props;
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <Box className={classes.subWrapper}>
          <Container>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <CustomText fontSize="30px" fontWeight={200} color="#ffffff">
                  Your Selected Package
                </CustomText>
                {this.state.packages.length > 0 &&
                  this.state.packages.map((data, idx) => {
                    return (
                      <Box
                        display="flex"
                        flexDirection="row"
                        margin="20px"
                        alignItems="center"
                      >
                        <CustomPlanCard
                          imgFlag={false}
                          label={data.packageName}
                          cost={data.cost}
                          key={idx.toString()}
                          counterFlag={true}
                          costFlag={true}
                          onClickFunc={(val, costVal, _id) =>
                            this.onClickFunc(val, costVal, data.packageId)
                          }
                        />
                        <Box className={classes.description}>
                          <CustomText fontSize="20px">
                            What is included
                          </CustomText>
                          <ul style={{ color: '#ffffff' }}>
                            <li>
                              Access to {data.totalApis} API's
                              {' ' + data.totalHits} API calls
                            </li>
                            <li>Rate limited to monthly only</li>
                          </ul>
                        </Box>
                        <ButtonComponent
                          height="30px"
                          className={classes.delete}
                          onClick={(_idx) => this.delete(idx)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            style={{ height: '20px' }}
                          />
                        </ButtonComponent>
                      </Box>
                    );
                  })}
              </Box>
              <Box width="30%">
                <Box className={classes.payment}>
                  <CustomText
                    fontSize="30px"
                    fontWeight={200}
                    color="#ffffff"
                    align="center"
                  >
                    Payment Summary
                  </CustomText>
                  <Box margin="20px">
                    {this.state.packages.length > 0 &&
                      this.state.packages.map((data) => {
                        cost = cost + +data.cost.slice(1);
                        return (
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            marginBottom="6px"
                          >
                            <CustomText
                              fontSize="20px"
                              color="#ffffff"
                              fontWeight={200}
                              className={classes.commonStyle}
                            >
                              {data.packageName}
                            </CustomText>
                            <CustomText
                              fontSize="20px"
                              color="#ffffff"
                              fontWeight={200}
                            >
                              {data.cost}
                            </CustomText>
                          </Box>
                        );
                      })}
                    <Divider />
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      marginBottom="6px"
                    >
                      <CustomText
                        fontSize="25px"
                        color="#ffffff"
                        className={classes.commonStyle}
                      >
                        Total Amount
                      </CustomText>
                      <CustomText fontSize="25px" color="#ffffff">
                        ${cost}
                      </CustomText>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <ButtonComponent
                    backgroundColor={'white'}
                    className={classes.buttonPayment}
                    height={'45.1px'}
                    width={'155px'}
                    fontSize={'18px'}
                    hoverColor={'white'}
                    labelColor={'#0898be'}
                    onClick={this.choosePackages}
                  >
                    Choose More Packages
                  </ButtonComponent>
                  <ButtonComponent
                    disabled={this.state.packages.length > 0 ? false : true}
                    backgroundColor={
                      this.state.packages.length > 0 ? 'white' : '#808080'
                    }
                    className={classes.buttonPayment}
                    height={'40.1px'}
                    width={'140px'}
                    fontSize={'18px'}
                    hoverColor={'white'}
                    labelColor={'#0898be'}
                    onClick={(_val) => this.makePayment(cost)}
                  >
                    Pay Now
                  </ButtonComponent>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </MainScreen>
    );
  }
}

export default withStyles(useStyles)(Cart);
