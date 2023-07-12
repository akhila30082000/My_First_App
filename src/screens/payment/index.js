import { Box, Container, withStyles } from '@material-ui/core';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CustomText from '../../components/common/CustomText';
import MainScreen from '../../components/common/MainScreen';
import backgroundImg from '../../assets/background.png';
import cards from '../../assets/bank-cards.png';
import visa from '../../assets/visa.svg';
import masterCard from '../../assets/mc_symbol.svg';
import rupay from '../../assets/rupay.png';
import RadioButton from '../../components/common/Radio';
import ButtonComponent from '../../components/common/ButtonComponent';
import ModalUi from '../../components/common/Modal';
import CardComponent from '../../components/common/CardComponent';
import Cleave from 'cleave.js/react';
import { postPayment } from '../../redux/actions/postPayment';
import Loader from '../../components/common/loader';

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
  commonStyles: { marginTop: '20px' },
  cost: { marginLeft: '30px', marginTop: '20px' },
  credit: { height: '35px', width: '35px', margin: '20px' },
  accept: { marginLeft: '30px' },
  cards: {
    height: '50px',
    width: '50px',
    margin: '0px 5px 0px 5px',
  },
  box: {
    border: '1px solid #ffffff',
    borderRadius: '10px',
    padding: '5px',
    marginLeft: '35px',
    background: '#e6ffff',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    marginLeft: '30px',
    alignItems: 'center',
  },
  radio: {
    marginLeft: '10px',
    marginTop: '5px',
    fontFamily: 'auto',
  },
  buttonPayment: { marginTop: '20px', bottom: 5, marginRight: '20px' },
  formField: {
    width: '350px',
    padding: '10px',
    fontSize: '15px',
    borderRadius: '5px',
    borderColor: '#ffffff',
    margin: '5px 0px 5px 0px',
  },
});
class Payment extends Component {
  state = {
    totalCost:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.totalCost) ||
      false,
    cardNumber: '',
    expiryNumber: '',
    cvv: '',
    cardNumberError: false,
    expiryError: false,
    cvvError: false,
    modalStatus: false,
    creditCardType: '',
    ceditCardExpiryDate: '',
    packages:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packages) ||
      false,
    radio: '',
    radioError: false,
    transactionDate: '',
    transactionId: '',
    onPaymentStatus: true,
    loadingStatus: false,
  };

  makePayment = () => {
    let tempObj, finalObj;
    let tempArray = [];
    if (this.state.radio === '') {
      this.setState({ radioError: true });
    } else if (this.state.radio === 'cards' && this.state.cardNumber === '') {
      this.setState({ cardNumberError: true });
    } else if (this.state.radio === 'cards' && this.state.expiryNumber === '') {
      this.setState({ expiryError: true });
    } else if (this.state.radio === 'cards' && this.state.cvv === '') {
      this.setState({ cvvError: true });
    } else {
      this.setState({ radioError: false });
      this.state.packages.map((data) => {
        tempObj = {
          packageId: data.packageId,
          packageName: data.packageName,
          amount: data.cost.substring(1),
        };
        tempArray.push(tempObj);
        return null;
      });
      finalObj = {
        cartItems: tempArray,
        paymentSource: 'brainTree',
      };
      this.setState({ loadingStatus: true });
      this.props.postPayment(finalObj);
    }
  };
  onContinue = () => {
    this.props.history.push('/availablePackage');
    this.setState({ modalStatus: false });
  };
  onNo = () => {
    this.setState({ modalStatus: false });
  };
  onCreditCardChange = (e) => {
    this.setState({ cardNumberError: false });
    this.setState({ cardNumber: e.target.rawValue });
  };
  onCreditCardExpiryChange = (e) => {
    this.setState({ expiryError: false });
    this.setState({ expiryNumber: e.target.rawValue });
  };
  onCVVChange = (e) => {
    this.setState({ cvvError: false });
    this.setState({ cvv: e.target.value });
  };
  onPayment = () => {
    if (this.props.paymentInfo !== undefined) {
      if (this.props.paymentInfo.data !== undefined) {
        if (this.state.onPaymentStatus) {
          this.setState({ onPaymentStatus: false });
          this.setState({ loadingStatus: false });
          this.setState({ modalStatus: true });
          this.props.paymentInfo.data.transactions.map((data) => {
            this.setState({ transactionDate: data.transcationDate });
            this.setState({ transactionId: data.transactionId });
            return null;
          });
        }
      }
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <Box className={classes.subWrapper}>
          <Container>
            <Box display="flex" flexDirection="row">
              <CustomText
                fontSize="30px"
                fontWeight={200}
                color="#ffffff"
                className={classes.commonStyles}
              >
                Make Payment:
              </CustomText>
              <CustomText
                fontSize="30px"
                fontWeight={200}
                color="#fae84b"
                className={classes.cost}
              >
                {'$' + this.state.totalCost}
              </CustomText>
            </Box>
            <Box display="flex" flexDirection="row">
              <CustomText
                fontSize="30px"
                fontWeight={200}
                color="#ffffff"
                className={classes.commonStyles}
              >
                Credit/Debit cards
              </CustomText>
              <img className={classes.credit} src={cards} alt="csmart" />
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <RadioButton
                className={classes.radio}
                labelColor="#4b485e"
                fWeight={500}
                font="Rubik"
                variant="body1"
                singleRadioLabel="We Accept"
                textcolor="#FFFFFF"
                onChange={(val, id) => this.setState({ radio: id })}
                singleRadioValue={this.state.radio}
                id="cards"
              />
              <Box className={classes.box}>
                <img className={classes.cards} src={visa} alt="csmart" />
                <img className={classes.cards} src={masterCard} alt="csmart" />
                <img className={classes.cards} src={rupay} alt="csmart" />
              </Box>
            </Box>
            <CardComponent
              className={classes.card}
              height={'300px'}
              backGroundcolor={'rgba(255, 255, 255, 0.3)'}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <CustomText fontSize="17px" fontWeight={200} color="#ffffff">
                  Enter Card Number
                </CustomText>
                {this.state.cardNumberError ? (
                  <CustomText color="#eb4034">
                    Card Number is manditory
                  </CustomText>
                ) : (
                  ''
                )}
              </Box>
              <Cleave
                placeholder="Enter credit card number"
                options={{
                  blocks: [4, 4, 4, 4],
                  creditCard: true,
                  //   this.onCreditCardTypeChanged,
                }}
                onChange={(e) => this.onCreditCardChange(e)}
                className={classes.formField}
              />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <CustomText fontSize="17px" fontWeight={200} color="#ffffff">
                  Enter Expiry Date
                </CustomText>
                {this.state.expiryError ? (
                  <CustomText color="#eb4034">
                    Enter Expiry Date is manditory
                  </CustomText>
                ) : (
                  ''
                )}
              </Box>
              <Cleave
                placeholder="MM/YY"
                options={{ date: true, datePattern: ['m', 'd'] }}
                onChange={this.onCreditCardExpiryChange}
                className={classes.formField}
              />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <CustomText fontSize="17px" fontWeight={200} color="#ffffff">
                  Enter CVV
                </CustomText>
                {this.state.cvvError ? (
                  <CustomText color="#eb4034">
                    Enter CVV is manditory
                  </CustomText>
                ) : (
                  ''
                )}
              </Box>
              <Cleave
                placeholder="CVV"
                options={{
                  blocks: [3],
                  numericOnly: true,
                }}
                onChange={this.onCVVChange}
                className={classes.formField}
              />
            </CardComponent>
            <CustomText
              fontSize="30px"
              fontWeight={200}
              color="#ffffff"
              className={classes.commonStyles}
            >
              Payment Wallets
            </CustomText>
            <RadioButton
              className={classes.radio}
              labelColor="#4b485e"
              fWeight={500}
              variant="body1"
              label="Payment Wallets"
              textcolor="#34a76c"
              onChange={(val, id) => this.setState({ radio: id })}
              singleRadioValue={this.state.radio}
              imageLabel="/static/images/PayPal.svg"
              id="paypal"
            />
            <Box display="flex" flexDirection="row" alignItems="center">
              <ButtonComponent
                className={classes.buttonPayment}
                height={'40.1px'}
                width={'140px'}
                fontSize={'18px'}
                backgroundColor={'white'}
                hoverColor={'white'}
                labelColor={'#0898be'}
                onClick={this.makePayment}
              >
                Make Payment
              </ButtonComponent>
              {this.state.radioError && (
                <CustomText color="#eb4034" fontSize="20px" fontWeight="500">
                  select payment Mode
                </CustomText>
              )}
            </Box>
            <ModalUi
              title={'Payment Transaction Details'}
              isOpen={this.state.modalStatus}
              onClose={(event) => this.onNo(event)}
              primaryText={'Continue'}
              onPrimaryClick={this.onContinue}
            >
              <CustomText fontSize="16px" color={'#4b485e'}>
                Thank you for purchasing the packages. Now you can start
                accessing the APis which you have opted . Your payment details
                are <br />
                total amount paid :<b>{' $' + this.state.totalCost}</b>
                <br />
                transactionDate : <b>{' ' + this.state.transactionDate}</b>
                <br /> transactionId :<b>{' ' + this.state.transactionId}</b>
                <br />
                <br />
                You will also get an email confirmation for the same .
              </CustomText>
            </ModalUi>
            {this.props.paymentInfo ? this.onPayment() : ''}
            {this.state.loadingStatus ? (
              <Loader open={this.state.loadingStatus} />
            ) : (
              ''
            )}
          </Container>
        </Box>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return { paymentInfo: state.postPayment };
};
const mapDispatchToProps = (dispatch) => {
  return { postPayment: (x) => dispatch(postPayment(x)) };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(Payment);
