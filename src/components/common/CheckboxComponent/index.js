import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import CustomText from '../CustomText';
const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    '&.MuiCheckbox-colorSecondary.Mui-checked': {
      color: 'white',
    },
  },
}));

const CheckBoxComponent = ({
  label,
  onClick,
  checked,
  error,
  name,
  helperText,
}) => {
  const classes = useStyles();
  return (
    <div style={{}}>
      <Checkbox
        className={classes.root}
        label={label}
        onClick={onClick}
        checked={checked}
        error={error}
        name={name}
      ></Checkbox>
      {error && <CustomText color="red">{helperText}</CustomText>}
    </div>
  );
};

CheckBoxComponent.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
export default CheckBoxComponent;
