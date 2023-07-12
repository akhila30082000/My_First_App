import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
const MainLink = withStyles(() => ({
  underline: {
    '.&hover': {
      textDecoration: 'underline',
    },
  },
  root: {
    color: 'white',
    fontSize: '16px',
    fontFamily: 'Rubik',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    fontStretch: 'normal',
  },
}))(Link);

const LinkComponent = ({ onClick, children }) => {
  return <MainLink onClick={onClick}>{children}</MainLink>;
};

LinkComponent.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
};
export default LinkComponent;
