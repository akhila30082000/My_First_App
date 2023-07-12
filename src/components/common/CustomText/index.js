import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const MainText = withStyles(() => ({
  root: {
    color: (props) => (props.color ? props.color : '#ffff'),
    marginTop: (props) => props.marginTop,
    // marginRight: '262px',
    // marginBottom: '19px',
    marginLeft: '0px',
    fontSize: (props) => (props.fontSize ? props.fontSize : '16px'),
    textAlign: (props) => (props.align ? props.align : 'left'),
    fontFamily: 'Roboto',
    fontWeight: (props) => (props.fontWeight ? props.fontWeight : '500'),
    lineHeight: '1.2',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    fontStretch: 'normal',
  },
}))(FormHelperText);

const CustomText = ({
  fontSize,
  marginTop,
  children,
  fontWeight,
  color,
  className,
  align,
}) => {
  return (
    <MainText
      fontSize={fontSize}
      marginTop={marginTop}
      fontWeight={fontWeight}
      color={color}
      align={align}
      className={className}
    >
      {children}
    </MainText>
  );
};

CustomText.propTypes = {
  children: PropTypes.element,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  color: PropTypes.string,
  marginTop: PropTypes.string,
  align: PropTypes.string,
};
export default CustomText;
