import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DeletePostComponent from './deletealert';
import EditPostComponent from './editDialog';
import ToastrComponent from './toastrComponent';
import CommentComponent from './comment';
import EditIcon from '@material-ui/icons/Edit';
import DialogComponent from './dialogComponent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    cursorPointer: {
        cursor: "pointer"
    },
    dpflex: {
        display: "flex"
    },
    search: {
        marginBottom: theme.spacing(2),
      },
    dataLoader: {
        textAlign: "center",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    }
}));

export default function Tab2(props) {
    const classes = useStyles();

    const [propertyData, setPropertyData] = useState([]);
    const [alertStatusDelete, setAlertStatusDelete] = useState(false);
    const [selectedRowDelete, setSelectedRowDelete] = useState(null);
    const [alertStatusEdit, setAlertStatusEdit] = useState(false);
    const [selectedRowEdit, setSelectedRowEdit] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [toastData, setToastData] = React.useState(null);
    const [ postDialog, setPostDialog] = useState(false);
    const [ loader, setLoader] = useState(true);
    const { userId } = props;

    const [searchData, startSearch] = React.useState(null);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let url = '';
        if (userId) {
            url = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
        } else {
            url = 'https://jsonplaceholder.typicode.com/posts';
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPropertyData(data);
                setLoader(false)
            });
    }

    const onEditRow = (e, row) => {
        e.stopPropagation();
        setSelectedRowEdit(row);
        setAlertStatusEdit(true);
    }

    const onDeleteRow = (e, row) => {
        e.stopPropagation();
        setSelectedRowDelete(row);
        setAlertStatusDelete(true);
    }

    const cancelDelete = () => {
        setSelectedRowDelete(null);
        setAlertStatusDelete(false);
    }

    const cancelEdit = () => {
        setSelectedRowEdit(null);
        setAlertStatusEdit(false);
    }

    const clickRow = (e, row) => {
        e.stopPropagation();
        setSelectedRow(row);
        setPostDialog(true)
    }

    const cancelDialog = () => {
        setSelectedRow(null);
        setPostDialog(false);
    }

    return (
        <>
        <TextField 
            className={classes.search}
            id="outlined-search"
            label="Search Title or Body"
            type="search"
            variant="outlined"
            onKeyUp={(evt) =>
                startSearch(evt.target.value )
            }
        />

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                !userId ?
                                    <StyledTableCell>Username</StyledTableCell> : ''
                            }
                            <StyledTableCell>Post&nbsp;Id</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Body</StyledTableCell>
                            {
                                !userId ?
                                    <StyledTableCell>Action</StyledTableCell> : ''
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propertyData.filter((row)=>{
                            if(searchData == null)
                                return row
                            else if(row.title.toLowerCase().includes(searchData.toLowerCase()) || row.body.toLowerCase().includes(searchData.toLowerCase())){
                                return row
                        }}).map((row) => (
                            <StyledTableRow key={row.name} onClick={(e) => clickRow(e, row)}>
                                {
                                    !userId ?
                                        <TableCell component="th" scope="row">
                                            {row.userId}
                                        </TableCell> : ''
                                }
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.body}</TableCell>
                                {
                                    !userId ?
                                        <TableCell>
                                            <div className={classes.dpflex}>
                                                <IconButton onClick={(e) => onEditRow(e, row)} >
                                                    <EditIcon className={classes.cursorPointer} />
                                                </IconButton>
                                                <IconButton onClick={(e) => onDeleteRow(e, row)} >
                                                    <DeleteIcon className={classes.cursorPointer} />
                                                </IconButton>
                                            </div>
                                        </TableCell> : ''
                                }
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                
                { loader ? <div className={classes.dataLoader}><CircularProgress /></div> : ""}

                {
                    alertStatusDelete ? <DeletePostComponent cancelDelete={cancelDelete} fetchData={fetchData} setToastData={setToastData} row={selectedRowDelete} status={alertStatusDelete} /> : ''
                }
                {
                    alertStatusEdit ? <EditPostComponent cancelEdit={cancelEdit} fetchData={fetchData} setToastData={setToastData} row={selectedRowEdit} status={alertStatusEdit} /> : ''
                }
                {
                    postDialog ? <DialogComponent cancelDialog={cancelDialog} row={selectedRow} status={postDialog} title={"User Comments"} 
                        content={<CommentComponent postId={selectedRow.id} />}
                    /> : ''
                }
                <div>
                    {toastData && toastData.status ? <ToastrComponent data={toastData} setToastData={setToastData} /> : ''}
                </div>
            </TableContainer>
        </>
    );
}
