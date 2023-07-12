import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, ButtonGroup } from '@material-ui/core';
import CustomText from '../CustomText';
import { bool, func, string } from 'prop-types';
const useStyles = makeStyles(() => ({
  root: {
    backGroundcolor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 2px 15px 0 rgba(0,0,0,0.3)',
    height: 'auto',
    width: '250px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    flexDirection: 'column',
    background: (props) => (props.select ? 'rgba(255, 255, 255, 0.3)' : ''),
    justifyContent: (props) => (props.costFlag ? '' : 'space-between'),
    margin: '19px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
    },
  },
  image: {
    height: '85px',
    width: '85px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    '&.MuiButton-outlined ': {
      border: '1px solid #ffffff',
    },
    '&.MuiButton-root': {
      color: '#ffffff',
    },
  },
  status: {
    color: (props) => (props.status === 'ACTIVE' ? '#96db35' : '#de3f12'),
  },
}));
const CustomPlanCard = ({
  label,
  image,
  onClick,
  imgFlag,
  costFlag,
  cost,
  select,
  handleIncrement,
  handleDecrement,
  onClickFunc,
  counterFlag,
  localImg,
  status,
}) => {
  const classes = useStyles({ costFlag, select, status });
  const [costVal] = useState(cost);
  const [counter, setCounter] = useState(1);
  handleIncrement = () => {
    setCounter(counter + 1);
    onClickFunc(counter, costVal);
  };

  handleDecrement = () => {
    setCounter(counter - 1);
    onClickFunc(counter, costVal);
  };
  return (
    <Box className={classes.root} onClick={onClick}>
      {imgFlag && (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={'data:image/png;base64,' + image}
          alt={'image'}
          className={classes.image}
        />
      )}
      {localImg && (
        <img
          src={localImg}
          alt={localImg}
          style={{ height: '70px', width: '70px' }}
        />
      )}
      <CustomText fontSize="20px">{label}</CustomText>
      {costFlag && <CustomText fontSize="20px">{cost}</CustomText>}
      {status && <CustomText className={classes.status}>{status}</CustomText>}
      {counterFlag && (
        <ButtonGroup
          size="small"
          aria-label="small outlined button group"
          className={classes.buttonGroup}
        >
          <Button onClick={handleDecrement} className={classes.button}>
            -
          </Button>
          <Button disabled className={classes.button}>
            {counter}
          </Button>
          <Button onClick={handleIncrement} className={classes.button}>
            +
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};
CustomPlanCard.defaultProps = {
  imgFlag: true,
  costFlag: false,
  counterFlag: false,
};
CustomPlanCard.propTypes = {
  label: string,
  image: string,
  onClick: func,
  imgFlag: bool,
  costFlag: bool,
  cost: string,
  onClickFunc: func,
  counterFlag: bool,
  localImg: string,
  status: string,
};

export default CustomPlanCard;
