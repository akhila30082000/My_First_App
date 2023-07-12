import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomText from '../CustomText';
import { Box } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  root: {
    fontSize: '16px',
    fontFamily: 'Rubik',
    width: '392px',
    height: '70px !important',
    borderWidth: '2px',
    borderStyle: 'solid ',
    borderColor: (props) => (props.bordercolor ? props.bordercolor : '#ffffff'),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: (props) => (props.color ? props.color : '#fff'),
    '& .focus': {
      borderColor: (props) =>
        props.bordercolor ? props.bordercolor : '#ffffff',
    },
  },
  title: {
    marginBottom: '10px',
  },
}));

const TextAreaComponent = ({
  label,
  onChange,
  value,
  bordercolor,
  color,
  name,
  helperText,
  error,
}) => {
  const classes = useStyles({ bordercolor, color });
  return (
    <Box display="flex" flexDirection="column">
      <CustomText color="#4b485e" className={classes.title}>
        {label}
      </CustomText>
      <TextareaAutosize
        className={classes.root}
        onChange={onChange}
        defaultValue={value}
        name={name}
        error={error}
      />
      {error && (
        <CustomText color="red" fontSize={'13px'}>
          {helperText}
        </CustomText>
      )}
    </Box>
  );
};

TextAreaComponent.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  bordercolor: PropTypes.bool,
  name: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
};
export default TextAreaComponent;
