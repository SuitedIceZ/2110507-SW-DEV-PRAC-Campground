import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Prompt } from 'next/font/google'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const inter = Prompt({weight: '400', subsets: ['thai']})

interface AlertDialogProps {
  open: boolean;
  titleText?: string;
  contentText?: string;
  closeText?: string;
  confirmText?: string;
  handleClose: () => void;
  handleComfirm: () => void;
}

let theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  }
})

export default function AlertDialog({open, titleText, contentText, closeText, confirmText, handleClose, handleComfirm} : AlertDialogProps ) {
  return (
    <React.Fragment >
      <Dialog  
        className={inter.className}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{borderRadius: 20}}
      >
        <ThemeProvider theme={theme}>
          <DialogTitle style={{color:'black', fontWeight:700,}} id="alert-dialog-title">
            {titleText || "Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{color:'#909090'}} id="alert-dialog-description">
              {contentText || "Please comfirm."}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{display: 'flex',justifyContent:'space-between', margin: '0px 10px'}}>
            <Button style={{color:'#909090', fontWeight:500}} onClick={handleClose}>
              {closeText || "Cancel"}
            </Button>
            <Button style={{color:'black', fontWeight:700}} onClick={handleComfirm} autoFocus color="error">
              {confirmText || "Comfirm"}
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </React.Fragment>
  );
}
