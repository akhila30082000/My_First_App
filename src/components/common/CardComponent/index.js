import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

const MainCard = withStyles(() => ({
  root: {
    overflow: 'hidden',
    width: (props) => (props.width ? props.width : '469px'),
    boxShadow: '0 2px 15px 0 rgba(0,0,0,0.3)',
    backgroundColor: (props) => props.backGroundcolor,
    height: (props) => (props.height ? props.height : '636px'),
    borderRadius: '10px',
  },
}))(Card);
const MainCardContent = withStyles(() => ({
  root: {
    padding: '0px',
    height: '36px',
    '&:last-child': {
      paddingBottom: '0px',
      marginLeft: (props) => props.marginLeft,
      marginTop: (props) => (props.marginTop ? props.marginTop : '22px'),
    },
  },
}))(CardContent);

const CardComponent = ({
  height,
  width,
  backGroundcolor,
  marginTop,
  marginLeft,
  children,
  className,
}) => {
  return (
    <MainCard
      height={height}
      width={width}
      backGroundcolor={backGroundcolor}
      className={className}
    >
      <MainCardContent marginTop={marginTop} marginLeft={marginLeft}>
        {children}
      </MainCardContent>
    </MainCard>
  );
};

CardComponent.propTypes = {
  children: PropTypes.element,
  marginLeft: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  backGroundcolor: PropTypes.string,
  marginTop: PropTypes.string,
};
export default CardComponent;
