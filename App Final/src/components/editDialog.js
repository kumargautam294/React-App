import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import UpdatePostForm from './updateForm';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditPostComponent(props) {
    const { status, row } = props;
    const [open, setOpen] = React.useState(status);

    const handleClose = () => {
        setOpen(false);
        props.cancelEdit();
    };

    const onEdit = (data) => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + row.id, {
            method: 'PUT',
            body: JSON.stringify({
                id: row.id,
                title: data.title,
                body: data.body,
                userId: row.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                props.setToastData({
                    status: true,
                    type: 'success',
                    message: 'Successfully Updated.'
                });
                props.fetchData();
                props.cancelEdit();
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
                <DialogTitle id="alert-dialog-slide-title">{"Edit"}</DialogTitle>
                <DialogContent>
                    <UpdatePostForm handleClose={handleClose} onEdit={onEdit} post={row} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
