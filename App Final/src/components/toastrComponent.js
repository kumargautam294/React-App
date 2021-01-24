import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ToastrComponent(props) {
    const { status, type, message } = props.data;
    const classes = useStyles();

    const handleClose = (event, reason) => {
        props.setToastData({
            type: "success",
            message: "",
            status: false
        });
    };

    return (
        <div> 
            {status ?  
            <Snackbar open={status} autoHideDuration={2500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
            : null }
        </div>
    );
}