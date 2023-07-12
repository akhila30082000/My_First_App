import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import {
  Slide,
  DialogContentText,
  DialogActions,
  Dialog,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import ButtonComponent from '../ButtonComponent';
import CustomText from '../CustomText';
import closeIcon from '../../../assets/close.png';
import clsx from 'clsx';
const useStyles = makeStyles(() => ({
  paperroot: {
    '& .MuiDialog-paper': {
      width: '100%',
    },
  },
  content: {
    '&.MuiDialogContent-root': {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px C4C2C1',
        borderRadius: '5px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#DBD9D8',
        outline: '1px solid C4C2C1',
        borderRadius: '5px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#C4C2C1',
      },
    },
  },
}));
const styles = (theme) => ({
  root: {
    backgroundColor: '#0279a8',
    width: (props) => (props.width ? props.width : '92%'),
    height: 'auto',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textDiv: {
    [theme.breakpoints.down('xs')]: {
      width: '215px',
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, width, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      width={width}
      {...other}
    >
      <CustomText color="#ffffff" className={classes.textDiv}>
        {children}
      </CustomText>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <img src={closeIcon} alt={closeIcon} className={classes.iconImg} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2.5),
  },
}))(MuiDialogContent);
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
const ModalUi = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  primaryText,
  onPrimaryClick,
  primaryButtonDisabled,
  width,
  className,
  secondaryTextflag,
  tertiary,
  onTertiaryClick,
  editFlag,
  fourth,
  onRemoveClick,
}) => {
  const classes = useStyles({});
  return (
    <div>
      <Dialog
        className={clsx(classes.paperroot, className)}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        disableEnforceFocus
        TransitionComponent={Transition}
        aria-describedby="customized-dialog-description"
      >
        {title && (
          <DialogTitle
            id="customized-dialog-title"
            onClose={onClose}
            width={width}
          >
            {title}
          </DialogTitle>
        )}
        <DialogContent className={classes.content}>
          {description && (
            <DialogContentText>
              <b>{description}</b>
            </DialogContentText>
          )}
          {children}
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {secondaryTextflag && secondaryTextflag ? (
            <div />
          ) : (
            <ButtonComponent onClick={onClose} backgroundcolor="white">
              Cancel
            </ButtonComponent>
          )}
          {editFlag && fourth && (
            <ButtonComponent
              onClick={onRemoveClick}
              color="primary"
              disabled={primaryButtonDisabled}
            >
              {fourth}
            </ButtonComponent>
          )}
          {tertiary && (
            <ButtonComponent
              onClick={onTertiaryClick}
              color="primary"
              disabled={primaryButtonDisabled}
            >
              {tertiary}
            </ButtonComponent>
          )}
          {primaryText && (
            <ButtonComponent
              onClick={onPrimaryClick}
              color="primary"
              disabled={primaryButtonDisabled}
            >
              {primaryText}
            </ButtonComponent>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
ModalUi.defaultProps = {
  isOpen: false,
  primaryButtonDisabled: false,
  editFlag: false,
};
ModalUi.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  primaryButtonDisabled: PropTypes.bool,
  width: PropTypes.string,
  secondaryTextflag: PropTypes.bool,
  tertiary: PropTypes.string,
  onTertiaryClick: PropTypes.func,
};

export default ModalUi;
