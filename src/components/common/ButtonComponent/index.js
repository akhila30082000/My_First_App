import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
const MainButton = withStyles(() => ({
  root: {
    height: (props) => props.height,
    width: (props) => props.width,
    backgroundColor: (props) =>
      props.backgroundColor ? props.backgroundColor : 'default',
    borderRadius: '5px',
    boxShadow: (props) =>
      props.boxShadow ? props.boxShadow : '0px 0px 10px 2px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: (props) => props.hoverColor,
      boxShadow: (props) =>
        props.boxShadow
          ? props.boxShadow
          : ' 0px 0px 10px 2px rgba(0, 0, 0, 0.1)',
    },
    '&:active': {
      backgroundColor: '#ffffff',
      color: '#0898be',
    },
    border: (props) => props.border,
  },
  focusVisible: {
    backgroundColor: 'none',
  },
  label: {
    fontFamily: 'Rubik',
    fontSize: (props) => props.fontSize,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.22',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: (props) => props.labelColor,
    textTransform: 'none',
    textDecoration: (props) => props.textDecoration,
  },
}))(Button);
const useStyles = makeStyles(() => ({
  root: {},
}));
const ButtonComponent = ({
  backgroundColor,
  onClick,
  disabled,
  color,
  width,
  height,
  label,
  children,
  href,
  fontSize,
  hoverColor,
  labelColor,
  textDecoration,
  border,
  className,
  boxShadow,
}) => {
  const classes = useStyles();
  return (
    <MainButton
      className={clsx(classes.root, className)}
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      onClick={onClick}
      color={color}
      disabled={disabled}
      label={label}
      href={href}
      fontSize={fontSize}
      hoverColor={hoverColor}
      labelColor={labelColor}
      textDecoration={textDecoration}
      border={border}
      boxShadow={boxShadow}
    >
      {children}
    </MainButton>
  );
};

ButtonComponent.propTypes = {
  backgroundcolor: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.bool,
  disabled: PropTypes.bool,
  border: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.element,
  fontSize: PropTypes.string,
  hoverColor: PropTypes.string,
  labelColor: PropTypes.string,
  textDecoration: PropTypes.string,
  boxShadow: PropTypes.string,
};
export default ButtonComponent;
