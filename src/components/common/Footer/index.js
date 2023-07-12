import React from 'react';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CustomText from '../CustomText';
import { Box, Container } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    height: '44px',
  },
}));

const Footer = () => {
  const year = new Date().getFullYear();
  const classes = useStyles();
  return (
    <Box style={{ width: '100%', backgroundColor: '#4b485e' }}>
      <Container>
        <Box className={classes.root}>
          <CustomText fontSize={'14px'} fontWeight={'normal'}>
            © Csmart {year}. All Rights Reserved.
          </CustomText>
          <CustomText fontSize={'14px'} fontWeight={'normal'}>
            Terms of Usage | Privacy Policy
          </CustomText>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
