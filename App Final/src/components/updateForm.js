import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, TextField, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
        flexDirection: "column",
        display: "flex",
        overflowY: "auto",
        padding: 0,
        width: '100%'
    },
    date_format: {
        padding: "0 !important",
    },
    action_block: {
        textAlign: "center",
        paddingBottom: "10px",
        margin: '0 16px',
        display: 'none'
    },
    text_filed_container: {
        width: '100%',
        minWidth: '300px'
    },
    button_block: {
        width: '100%',
        display: 'none'
    },
    form: {
        width: "100%",
        marginTop: "8px"
    },
}));

export default function UpdatePostForm(props) {
    const { post } = props;
    const classes = useStyles();

    const [postData, setPostData] = useState({
        title: post && post.title || '',
        body: post && post.body || '',
    });

    useEffect(() => {
    }, []);

    const handleClose = () => {
        props.onEdit(postData)
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <List>
                    <ListItem>
                        <div className={classes.text_filed_container}>
                            <TextField
                                className={classes.text_filed_container}
                                size="small"
                                label={'Title'}
                                value={postData.title}
                                onChange={(evt) =>
                                    setPostData({ ...postData, title: evt.target.value })
                                }
                            />
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className={classes.text_filed_container}>
                            <TextField
                                className={classes.text_filed_container}
                                label={'Body'}
                                size="small"
                                multiline
                                value={postData.body}
                                InputProps={{ endAdornment: "" }}
                                onChange={(evt) =>
                                    setPostData({ ...postData, body: evt.target.value })
                                }
                            />
                        </div>
                    </ListItem>
                </List>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Update
                </Button>
            </form>
        </div>
    );
};
