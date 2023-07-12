import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButtonComponent from '../IconComponent';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
const MainSnackBarComponent = withStyles(() => ({
  root: {
    color: '#fff',
    fontSize: '16px',
    alignItems: 'center',
    fontFamily: 'Rubik',
    fontWeight: 400,
    lineHeight: 1.43,
    borderRadius: '4px',
    letterSpacing: 'normal',
    backgroundColor: '#0898be',
  },
}))(SnackbarContent);
const SnackBarComponent = ({ open, onClose, message, iconclose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={onClose}
    >
      <MainSnackBarComponent
        message={message}
        action={
          <IconButtonComponent onClick={iconclose}>
            <CloseIcon fontSize="small" />
          </IconButtonComponent>
        }
      ></MainSnackBarComponent>
    </Snackbar>
  );
};

SnackBarComponent.propTypes = {
  children: PropTypes.element,
  anchorOrigin: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  iconclose: PropTypes.func,
};
export default SnackBarComponent;
