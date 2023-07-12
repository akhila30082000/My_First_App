import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  string,
  oneOfType,
  shape,
  number,
  arrayOf,
  func,
  element,
  node,
} from 'prop-types';
import paypal from '../../../assets/PayPal.svg';

/**
 * sample Data format 
 *  <RadioButton
    radioGroupValues={[
    { label: 'Add Card', value: 'add Card' },
    { label: 'Debit card', value: 'debit card' },
    { label: 'Credit Card', value: 'credit Card' },
        ]}
      />
 */
const GreenRadio = withStyles({
  root: {
    color: '#ffffff',
    '&$checked': {
      color: '#ffffff',
    },
  },
  checked: {},
})(Radio);

const StyledFormControlLabel = withStyles({
  root: {
    color: (props) => (props.textcolor ? props.textcolor : '#98979a'),
    fontFamily: (props) => (props.font ? props.font : 'Roboto'),
  },
})(FormControlLabel);

const RadioButton = ({
  className,
  radioGroupValues,
  onChange,
  defaultValue,
  singleRadioLabel,
  singleRadioValue,
  value,
  textcolor,
  width,
  imageLabel,
  id,
  font,
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    radioGroupValues && radioGroupValues.length > 0
      ? onChange && onChange(event.target.value, event.target.id)
      : onChange && onChange(event.target.checked, event.target.id);
  };
  return (
    <Box component="div" className={className}>
      <FormControl component="fieldset" className={className}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          className={className}
        >
          {radioGroupValues && radioGroupValues.length > 0 ? (
            radioGroupValues.map((data, idx) => (
              <StyledFormControlLabel
                fontFamily={font}
                textcolor={textcolor}
                width={width}
                value={data.value}
                control={<GreenRadio color="primary" id={data.id} />}
                label={data.label}
                key={idx.toString()}
                id={data.id}
              />
            ))
          ) : (
            <StyledFormControlLabel
              fontFamily={font}
              textcolor={textcolor}
              value={singleRadioValue}
              width={width}
              control={<GreenRadio color="primary" id={id} />}
              label={
                imageLabel ? (
                  <img src={paypal} alt="paypal" />
                ) : (
                  singleRadioLabel
                )
              }
            />
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

RadioButton.propTypes = {
  font: string,
  id: string.isRequired,
  label: oneOfType([string, number, element, node]),
  labelColor: string,
  textcolor: string,
  radioGroupValues: arrayOf(
    shape({
      label: oneOfType([string, number, element, node]),
      value: oneOfType([string, number]),
    }),
  ),
  onChange: func,
  defaultValue: string,
  singleRadioValue: string,
  singleRadioLabel: string,
  value: string,
  variant: string,
  fWeight: number,
  width: string,
  imageLabel: string,
};

export default RadioButton;
