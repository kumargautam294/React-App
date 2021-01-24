import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogComponent from './dialogComponent';
import Tab2Component from './tab2';

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
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Tab1() {
    const classes = useStyles();

    const [usersData, setUsersData] = useState([]);
    const [ postDialog, setPostDialog] = useState(false);
    const [ selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsersData(data));
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
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Website</StyledTableCell>
                            <StyledTableCell>Company Name</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData.map((row) => (
                            <StyledTableRow key={row.name} onClick={(e) => clickRow(e, row)}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.website}</TableCell>
                                <TableCell>{row.company.name}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                postDialog ? <DialogComponent cancelDialog={cancelDialog} row={selectedRow} status={postDialog} title={"User Post"} 
                    content={<Tab2Component userId={selectedRow.id} />}
                /> : ''
            }
        </div>
    );
}
