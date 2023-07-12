import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';

const MainDialog = withStyles(() => ({
  paper: {
    height: '250px',
    width: '469px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
}))(Dialog);

const DialogBoxComponent = ({ header, content, actions, open }) => {
  return (
    <MainDialog open={open}>
      <MuiDialogTitle> {header}</MuiDialogTitle>
      <MuiDialogContent>{content}</MuiDialogContent>
      <MuiDialogActions>{actions}</MuiDialogActions>
    </MainDialog>
  );
};

DialogBoxComponent.propTypes = {
  header: PropTypes.element,
  content: PropTypes.element,
  actions: PropTypes.element,
  open: PropTypes.bool,
};
export default DialogBoxComponent;
