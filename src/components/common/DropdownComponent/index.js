import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CustomText from '../CustomText';
const MainFormControl = withStyles(() => ({
  root: {
    width: (props) => (props.width ? props.width : '392px'),
    fontFamily: 'Rubik',
    fontSize: '16px',
    color: (props) => (props.labelColor ? props.labelColor : 'white'),
  },
}))(FormControl);
const MainInputLabel = withStyles(() => ({
  root: {
    color: (props) => (props.labelColor ? props.labelColor : 'white'),
    fontSize: '16px',
    fontFamily: 'Rubik',
  },
}))(InputLabel);
const MainSelect = withStyles(() => ({
  icon: {
    color: (props) => (props.iconColor ? props.iconColor : 'white'),
  },
  focus: {
    backgroundColor: (props) =>
      props.iconColor ? props.iconColor : 'transparent',
  },
}))(Select);
const useStyles = makeStyles(() => ({
  root: {
    color: (props) => (props.labelColor ? props.labelColor : 'white'),
    fontSize: '16px',
    fontFamily: 'Rubik',
    '&.MuiSelect-select:focus': {
      backgroundColor: (props) =>
        props.backgroundColor ? props.backgroundColor : 'trasparent',
    },
    '&.MuiInput-underline:before': {
      borderBottom: (props) =>
        props.backgroundColor ? props.backgroundColor : '1px solid white',
    },
    '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: (props) =>
        props.backgroundColor ? props.backgroundColor : '1px solid white',
    },
    '&.MuiInput-underline:after': {
      borderBottom: (props) =>
        props.backgroundColor ? props.backgroundColor : '1px solid white',
    },
  },
}));
const MainMenuItem = withStyles(() => ({
  root: {
    fontFamily: 'Rubik',
    width: 'auto',
    overflow: 'hidden',
    fontSize: '16px',
    minHeight: '5px',
    fontWeight: 500,
    lineHeight: '1.56',
    paddingTop: '6px',
    whiteSpace: 'nowrap',
    letterSpacing: 'normal',
    paddingBottom: '6px',
  },
}))(MenuItem);
const DropDownComponent = ({
  label,
  value,
  onChange,
  name,
  error,
  helperText,
  dropdownOption,
  backgroundColor,
  iconColor,
  labelColor,
  width,
  className,
}) => {
  const classes = useStyles({ backgroundColor, iconColor, labelColor, width });
  return (
    <MainFormControl
      backgroundColor={backgroundColor}
      width={width}
      className={className}
    >
      <MainInputLabel labelColor={labelColor}>{label}</MainInputLabel>
      <MainSelect
        value={value}
        onChange={onChange}
        name={name}
        error={error}
        iconColor={iconColor}
        className={classes.root}
      >
        {dropdownOption &&
          dropdownOption.map((data, idx) => (
            <MainMenuItem value={data.value} key={idx.toString()}>
              {data.label}
            </MainMenuItem>
          ))}
      </MainSelect>
      {error && (
        <CustomText color="red" fontSize={'13px'}>
          {helperText}
        </CustomText>
      )}
    </MainFormControl>
  );
};

DropDownComponent.propTypes = {
  children: PropTypes.element,
  onMouseDown: PropTypes.func,
  dropdownOption: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  value: PropTypes.string,
};
export default DropDownComponent;
