import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CallVideoDialog({ open, setOpen, callName, idCall }) {
  //   const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const callVideoHandler = () => {
    window.open(`video-call/${idCall}`);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Incoming video chat"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {callName} is calling you, the call will start as soon as you
            answer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'gray' }} onClick={handleClose}>Decline</Button>
          <Button onClick={callVideoHandler} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
