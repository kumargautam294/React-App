import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletePostComponent(props) {
  const { status, row } = props;
  const [open, setOpen] = React.useState(status);

  const handleClose = () => {
    setOpen(false);
    props.cancelDelete();
  };

  const onDelete = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + row.id, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(data => {
        props.setToastData({
          status: true,
          type: 'success',
          message: 'Successfully deleted.'
        });
        props.fetchData();
        props.cancelDelete();
      }).catch((response) => {
        props.setToastData({
          status: true,
          type: 'Error',
          message: 'Something went wrong.'
        });
        props.cancelEdit();
      });
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
