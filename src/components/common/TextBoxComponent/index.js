import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import CustomText from '../CustomText';
import IconButtonComponent from '../IconComponent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

const MainFormControl = withStyles(() => ({
  root: {
    width: (props) => (props.width ? props.width : '392px'),
    fontFamily: 'Rubik',
    fontSize: '16px',
    color: (props) => (props.lableColor ? props.lableColor : 'white'),
  },
}))(FormControl);
const useStyles = makeStyles(() => ({
  root: {
    color: (props) => (props.lableColor ? props.lableColor : 'white'),
    fontSize: '16px',
    fontFamily: 'Rubik',
    '&.MuiSelect-select:focus': {
      backgroundColor: 'trasparent',
    },
    '&.MuiInput-underline:before': {
      borderBottom: (props) =>
        props.borderBottom ? props.borderBottom : '1px solid white',
    },
    '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: (props) =>
        props.borderBottom ? props.borderBottom : '1px solid white',
    },
    '&.MuiInput-underline:after': {
      borderBottom: (props) =>
        props.borderBottom ? props.borderBottom : '1px solid white',
    },
    '&.MuiInput-underline.Mui-error:after': {
      borderBottomColor: '#f44336',
      transform: 'scaleX(1)',
    },
    '&.MuiInputBase-input.MuiInput-input': {
      color: (props) => (props.lableColor ? props.lableColor : 'white'),
    },
  },
}));

const MainInputLabel = withStyles(() => ({
  root: {
    fontFamily: 'Rubik',
    outline: 0,
    fontStretch: 'normal',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    borderColor: (props) => (props.borderBottom ? props.borderBottom : 'white'),
    color: (props) => (props.lableColor ? props.lableColor : 'white'),
    fontSize: '16px',
    '&:focused': {
      color: (props) => (props.lableColor ? props.lableColor : 'white'),
    },
  },
  input: {
    color: (props) => (props.lableColor ? props.lableColor : 'white'),
    '&:focused': {
      color: (props) => (props.lableColor ? props.lableColor : 'white'),
    },
  },

  underline: {
    borderColor: (props) => (props.borderBottom ? props.borderBottom : 'white'),
  },
  focused: {
    color: (props) => (props.lableColor ? props.lableColor : 'white'),
  },
}))(InputLabel);
const TextBoxComponent = ({
  label,
  value,
  onChange,
  name,
  error,
  helperText,
  inputIcon,
  disabled,
  borderBottom,
  width,
  type,
  lableColor,
  required,
  iconFlag,
  className,
  iconPath,
}) => {
  const classes = useStyles({ lableColor, borderBottom });
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordProps = {
    password: (
      <InputAdornment position="end">
        <IconButtonComponent
          edge="end"
          id={label}
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {iconFlag ? (
            values.showPassword ? (
              <img src={iconPath} alt={iconPath} style={{ width: '25px' }} />
            ) : (
              <img src={iconPath} alt={iconPath} style={{ width: '25px' }} />
            )
          ) : values.showPassword ? (
            <Visibility />
          ) : (
            <VisibilityOff />
          )}
        </IconButtonComponent>
      </InputAdornment>
    ),
    end: (
      <InputAdornment position="end">
        {inputIcon && inputIcon.icon ? (
          <img src={inputIcon.icon} alt={iconPath} style={{ width: '25px' }} />
        ) : (
          ''
        )}
      </InputAdornment>
    ),
  };
  return (
    <MainFormControl width={width} className={clsx(classes.root, className)}>
      <MainInputLabel fontSize={'16px'} lableColor={lableColor}>
        {label}
      </MainInputLabel>
      <Input
        value={value}
        type={type === 'password' && !values.showPassword ? 'password' : 'text'}
        className={classes.root}
        onChange={onChange}
        disabled={disabled}
        name={name}
        error={error}
        lableColor={lableColor}
        borderBottom={borderBottom}
        startAdornment={
          inputIcon &&
          inputIcon.position === 'start' && (
            <InputAdornment position="start">
              {inputIcon && inputIcon.icon}
            </InputAdornment>
          )
        }
        endAdornment={
          type === 'password' || (inputIcon && inputIcon.position === 'end')
            ? passwordProps[type === 'password' ? type : inputIcon.position]
            : ''
        }
        required={required}
      />
      {error && (
        <CustomText color="red" fontSize={'13px'}>
          {helperText}
        </CustomText>
      )}
    </MainFormControl>
  );
};
TextBoxComponent.defaultProps = { iconFlag: false };
TextBoxComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.string,
  helperText: PropTypes.string,
  position: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.any]),
  iconFlag: PropTypes.bool,
  iconPath: PropTypes.string,
  inputIcon: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.any]),
    position: PropTypes.string,
  }),
};
export default TextBoxComponent;
