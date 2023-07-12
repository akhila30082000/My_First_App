import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
const MainInputAdornment = withStyles(() => ({
  root: {},
}))(InputAdornment);

const InputAdornmentComponent = ({ children, position }) => {
  return (
    <MainInputAdornment position={position}>{children}</MainInputAdornment>
  );
};

InputAdornmentComponent.propTypes = {
  children: PropTypes.element,
};
export default InputAdornmentComponent;
