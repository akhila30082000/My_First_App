import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import MainScreen from '../../components/common/MainScreen';
import loginimage from '../../assets/background.png';
import { Box, Container } from '@material-ui/core';
import CustomText from '../../components/common/CustomText';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import StyledTreeView from '../../components/common/TreeView';
import { data } from './static-data';

const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${loginimage})`,
});
const useStyles = () => ({
  title: {
    marginTop: '30px',
  },
  treeView: {
    overflowY: 'scroll',
    height: '500px',
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
  },
});
class Dashboard extends Component {
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
              Available Partners
            </CustomText>
            <Box className={classes.treeView}>
              <StyledTreeView data={data} />
            </Box>
          </Container>
        </SubWrapper>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(Dashboard);
