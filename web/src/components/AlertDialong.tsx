import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  open: boolean;
  titleText?: string;
  contentText?: string;
  closeText?: string;
  confirmText?: string;
  handleClose: () => void;
  handleComfirm: () => void;
}

export default function AlertDialog({open, titleText, contentText, closeText, confirmText, handleClose, handleComfirm} : AlertDialogProps ) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titleText || "Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText || "Please comfirm."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {closeText || "Cancel"}
          </Button>
          <Button onClick={handleComfirm} autoFocus color="error">
            {confirmText || "Comfirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
