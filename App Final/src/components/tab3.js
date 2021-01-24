import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ToastrComponent from './toastrComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
      display: 'flex',
      margin: 'auto'
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '50%',
    display: 'flex',
    margin: 'auto'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),

  },
  my_btn: {

    margin: theme.spacing(1),
    marginTop: theme.spacing(4),
    width: '50%',
    display: 'flex',
    margin: 'auto',
  },
}));

export default function Tab3(props) {
  const classes = useStyles();
  const [propertyData, setPropertyData] = useState([]);
  const [toastData, setToastData] = React.useState(null);

  const [postData, setPostData] = useState({
    title: '',
    body: '',
    userId: '',
  });

  useEffect(() => {
    NewPlagCheck();
  }, []);

  const NewPlagCheck = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setPropertyData(data));
  }

  const [userId, setUserId] = React.useState('');
  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const save = (e) => {
    e.stopPropagation();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setPostData({
          title: '',
          body: '',
          userId: '',
        });
        setToastData({
            status: true,
            type: 'success',
            message: 'Successfully Created.'
        });
      }).catch((response) => {
        setToastData({
            status: true,
            type: 'Error',
            message: 'Something went wrong.'
        });
    });
  }

  return (
    <div >
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel id="user-id">User Id</InputLabel>
          <Select
            labelId="user-id-input"
            id="user-id-input"
            value={postData.userId}
            onChange={(evt) =>
              setPostData({ ...postData, userId: evt.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {propertyData.map((row) => (
              <MenuItem value={row.id}>{row.username}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Select User Id</FormHelperText>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Title"
          required
          value={postData.title}
          onChange={(evt) =>
            setPostData({ ...postData, title: evt.target.value })
          }
        />
        <TextField
          id="standard-multiline-static"
          label="Body"
          multiline
          rows={4}
          defaultValue=""
          value={postData.body}
          placeholder="Type body details here"
          required
          onChange={(evt) =>
            setPostData({ ...postData, body: evt.target.value })
          }
        />
      </form>
      <Button className={classes.my_btn} variant="contained" color="primary" onClick={(e) => save(e)}>Submit</Button>
      <div>
        {toastData && toastData.status ? <ToastrComponent data={toastData} setToastData={setToastData} /> : ''}
      </div>
    </div>
  );
};
