import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
const MainIconButton = withStyles(() => ({
  root: {
    color: 'white',
    width: '19.7px',
    height: '10.4px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))(IconButton);

const IconButtonComponent = ({ onClick, onMouseDown, children, className }) => {
  return (
    <MainIconButton
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={className}
    >
      {children}
    </MainIconButton>
  );
};

IconButtonComponent.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
};
export default IconButtonComponent;
