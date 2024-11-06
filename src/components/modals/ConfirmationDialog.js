import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
export default function ConfirmationDialog({
  openConfirmationModal,
  setOpenConfirmationModal,
  onSubmit,
}) {
  const handleClickOpen = () => {
    setOpenConfirmationModal(true);
  };

  const handleClose = () => {
    setOpenConfirmationModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openConfirmationModal}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Προσοχή
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Θέλεις να αφαιρέσεις πρόσβαση του χρήστη από το υλικό σου;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ακυρωση
          </Button>
          <Button
            onClick={() => {
              onSubmit();
              handleClose(); // after deletion, close the dialog
            }}
          >
            Επιβεβαιωση
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
