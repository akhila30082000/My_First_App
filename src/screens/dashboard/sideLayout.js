import React from 'react';
import { Box, makeStyles, styled } from '@material-ui/core';
import CustomText from '../../components/common/CustomText';
import userImg from '../../assets/user.png';
import ButtonComponent from '../../components/common/ButtonComponent';
import { func, string } from 'prop-types';

const StyledLeftLayout = styled('div')({
  width: '20%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});
const styles = makeStyles({
  buttonStyles: {
    marginTop: '30px',
  },
});
export const SideLayout = ({ name, onClick }) => {
  const classes = styles();
  return (
    <StyledLeftLayout>
      <CustomText align="left" fontSize="30px">
        {name}
      </CustomText>
      <img
        style={{ width: '150px', height: '150px', marginTop: '30px' }}
        src={userImg}
        alt="client"
      />
      <ButtonComponent
        backgroundColor={'#898be'}
        onClick={() => onClick('app')}
        labelColor={'#ffffff'}
        height={'40.1px'}
        width={'200.4px'}
        fontSize={'18px'}
        // hoverColor={'white'}
        className={classes.buttonStyles}
      >
        Registerd Applications
      </ButtonComponent>
      <ButtonComponent
        backgroundColor={'#898be'}
        onClick={() => onClick('package')}
        labelColor={'#ffffff'}
        height={'40.1px'}
        width={'200.4px'}
        fontSize={'18px'}
        // hoverColor={'white'}
        className={classes.buttonStyles}
      >
        Purchased Packages
      </ButtonComponent>
    </StyledLeftLayout>
  );
};

SideLayout.Prototypes = {
  onClick: func,
  name: string,
};
export default SideLayout;
