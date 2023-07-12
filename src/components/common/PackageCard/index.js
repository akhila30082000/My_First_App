import { bool, func, number, string } from 'prop-types';
import React from 'react';
import ButtonComponent from '../ButtonComponent';
import { makeStyles } from '@material-ui/core/styles';
import CustomText from '../CustomText';
import { Box, Divider } from '@material-ui/core';
import clsx from 'clsx';
import IconButtonComponent from '../IconComponent';
import editIcon from '../../../assets/edit.png';
import deleteIcon from '../../../assets/delete.png';

const useStyles = makeStyles(() => ({
  card: {
    width: '250px',
    height: '300px',
    boxShadow: '0 2px 15px 0 rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '29px',
    background: (props) => (props.select ? 'rgba(255, 255, 255, 0.3)' : ''),
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  },
  animate: {
    width: '250px',
    height: '300px',
    boxShadow: '0 2px 15px 0 rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '29px',
    animation: `$FadeAnimation 10s`,
  },
  '@keyframes FadeAnimation': {
    '0%': {
      backgroundColor: '#99e6ff',
    },
    '100%': {
      backgroundColor: '0 2px 15px 0 rgba(0,0,0,0.3)',
    },
  },
  divider: { width: '100%' },
  title: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
  },
  cost: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    padding: '3px',
  },
  button: {
    width: '100%',
    height: '40px',
    fontSize: '16px',
    fontWeight: '100px',
    cursor: 'pointer',
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  editTitle: { width: '90%', justifyContent: 'center' },
  editIcon: {
    width: '10%',
    marginRight: '5px',
  },
  status: {
    color: (props) => (props.status === 'ACTIVE' ? '#96db35' : '#de3f12'),
    marginLeft: '5px',
    fontSize: '18px',
    fontWeight: 540,
  },
}));
const PackageCard = ({
  title,
  cost,
  noOfApis,
  totalNoOfHits,
  description,
  onClick,
  index,
  select,
  type,
  isAdmin,
  onEdit,
  onDelete,
  purchase,
  packageStatus,
  status,
}) => {
  const classes = useStyles({ select, status });
  return (
    <Box
      className={clsx(classes.card, {
        [classes.animate]: index,
      })}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box className={clsx({ [classes.edit]: !isAdmin })}>
        <CustomText
          fontSize="20px"
          className={clsx(classes.title, { [classes.editTitle]: !isAdmin })}
        >
          {title}
        </CustomText>
        {purchase
          ? ''
          : !isAdmin && (
              <Box style={{ gap: '20px' }}>
                {!packageStatus && (
                  <IconButtonComponent
                    className={clsx({ [classes.editIcon]: !isAdmin })}
                    onClick={onEdit}
                  >
                    <img
                      src={editIcon}
                      alt={'edit'}
                      style={{ height: '20px', width: '20px' }}
                    />
                  </IconButtonComponent>
                )}
                <IconButtonComponent
                  className={clsx({ [classes.deleteIcon]: !isAdmin })}
                  onClick={onDelete}
                >
                  <img
                    src={deleteIcon}
                    alt={'delete'}
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '5px',
                    }}
                  />
                </IconButtonComponent>
              </Box>
            )}
      </Box>
      <Divider className={classes.divider} />
      {purchase ? (
        <CustomText fontSize="16px" className={classes.cost}>
          PackageType :{' ' + type}
        </CustomText>
      ) : (
        <CustomText fontSize="16px" className={classes.cost}>
          {cost + type}
        </CustomText>
      )}
      {purchase && (
        <CustomText fontSize="16px" className={classes.cost}>
          Status : <span className={classes.status}>{' ' + status}</span>
        </CustomText>
      )}
      {purchase && (
        <CustomText fontSize="16px" className={classes.cost}>
          Cost :{' ' + cost}
        </CustomText>
      )}
      <Divider className={classes.divider} />
      {purchase ? (
        ''
      ) : (
        <CustomText className={classes.description}>
          {title === 'Custom'
            ? description
            : 'Access to ' + noOfApis + ' APIs ' + totalNoOfHits + ' API calls'}
        </CustomText>
      )}
      <ButtonComponent
        className={classes.button}
        hoverColor={'#ffffff'}
        labelColor={select ? '#ffffff' : '#0898be'}
        onClick={onClick}
        backgroundColor={select ? '#808080' : '#ffffff'}
        disabled={select ? true : false}
      >
        {purchase
          ? 'View'
          : title === 'Custom'
          ? 'Create Custom Plan'
          : select
          ? 'Ordered'
          : 'Order'}
      </ButtonComponent>
    </Box>
  );
};
PackageCard.propTypes = {
  type: string,
  title: string,
  cost: string,
  onClick: func,
  noOfApis: number,
  totalNoOfHits: number,
  description: string,
  index: bool,
  select: bool,
  isAdmin: bool,
  onEdit: func,
  onDelete: func,
  purchase: bool,
  packageStatus: bool,
  status: string,
};
export default PackageCard;
