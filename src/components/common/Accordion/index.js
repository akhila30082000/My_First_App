import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { array, bool, number, string } from 'prop-types';
import { Box, Container, Divider } from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomText from '../CustomText';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& .MuiAccordionSummary-root': {
      padding: '0px',
      [theme.breakpoints.down('xs')]: {
        alignItems: 'baseline',
      },
      [theme.breakpoints.only('sm')]: {
        alignItems: (props) =>
          props.alignItems ? props.alignItems : 'baseline',
      },
      [theme.breakpoints.only('md')]: {
        alignItems: (props) =>
          props.midalignItems ? props.midalignItems : 'baseline',
      },
    },
    '& .MuiPaper-elevation1': {
      background: '#e6e6e6',
      boxShadow: '0 2px 15px 0 rgb(0 0 0 / 30%)',
      borderRadius: '5px',
      width: '60%',
    },
    '& .MuiAccordionDetails-root': {
      padding: '0px',
      marginBottom: '10px',
    },
    '& .MuiAccordionSummary-content': {
      margin: '0px',
    },
    '& .MuiDivider-root': {
      border: '4.7px solid',
      height: '49px',
    },
    ' & .MuiCollapse-entered': {
      backgroundColor: 'beige',
    },
  },
}));
const UnStyledAccordion = withStyles((theme) => ({
  root: {
    maxHeight: '235px',
    [theme.breakpoints.down('md')]: {
      height: 'unset',
    },
    '&:before': {
      left: 'unset',
    },
  },
  rounded: {
    marginBottom: '8px',
    backgroundColor: '#f7f7f7',
  },
  expanded: {
    height: 'auto',
    flexGrow: 1,
    zIndex: 1,
    position: 'unset',
    width: '100%',
    minHeight: 'auto',
  },
}))(Accordion);

const Accordions = ({
  accordionData,
  alignItems,
  midalignItems,
  variant,
  className,
  cssFlag,
}) => {
  const classes = useStyles({ alignItems, midalignItems });
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={clsx(classes.root, className)}>
      {accordionData.map((data, idx) => (
        <UnStyledAccordion
          color={data.color}
          expanded={expanded === `panel${idx}`}
          onChange={handleChange(`panel${idx}`)}
          key={idx.toString()}
          TransitionProps={{ unmountOnExit: true }}
        >
          <Box component={cssFlag ? Container : 'div'}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                component="div"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  style={{ gap: '15px' }}
                >
                  <Divider
                    style={{
                      borderColor: '#' + data.color,
                      background: data.color,
                    }}
                  />
                  <CustomText variant={variant} color="#0898be" fontSize="20px">
                    <b>{data.transactionId}</b>
                  </CustomText>
                </Box>
              </Box>
            </AccordionSummary>
          </Box>
          <Box component={cssFlag ? Container : 'div'}>
            <AccordionDetails>{data.children}</AccordionDetails>
          </Box>
        </UnStyledAccordion>
      ))}
    </div>
  );
};
Accordions.propTypes = {
  accordionData: array,
  imgTrue: bool,
  image: string,
  alignItems: string,
  midalignItems: string,
  fWeight: number,
  variant: string,
  cssFlag: bool,
  color: string,
  iconFlag: bool,
};
export default Accordions;
