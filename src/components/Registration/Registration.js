import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import domo from 'ryuu.js';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

function Registration() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    userId: domo.env.userId,
    userName: domo.env.userName,
    userEmail: domo.env.userEmail,
    dataNeeded: '',
    purpose: '',
    whenNeeded: '',
    submittedAt: new Date().toISOString()
  });
  const [status, setStatus] = React.useState('notSubmitted');

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, submittedAt: new Date().toISOString() });

    setStatus('submitting');
    domo.post(`/domo/datastores/v1/collections/skiiri/documents/`, {
      "content": values
    }).then(data => setStatus('submitted'));
  }

  if (status !== 'submitted') {
    return (
      <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          id="input-data-needed"
          label="Data I need"
          value={values.dataNeeded}
          onChange={handleChange('dataNeeded')}
          className={classes.formControl}
          multiline
          rows="3"
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
        />
        <TextField
          required
          id="input-purpose"
          label="To do what?"
          value={values.purpose}
          onChange={handleChange('purpose')}
          className={classes.formControl}
          multiline
          rows="3"
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
        />
        <TextField
          required
          id="input-when-needed"
          label="When? (e.g. BOP, SIMPL, On-the-go...)"
          value={values.whenNeeded}
          onChange={handleChange('whenNeeded')}
          className={classes.formControl}
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
        />
        { status !== 'submitting'
          ?
          <Button variant="contained" type="submit" className={classes.formControl}>
            Submit
          </Button>
          :
          <CircularProgress className={classes.formControl} />
        }
      </form>
    );
  } else {
    return (
      <Typography variant="h5" gutterBottom align='center' style={{marginTop: 75}}>
        Thank you for submitting!
      </Typography>
    );
  }
}

export default Registration;
