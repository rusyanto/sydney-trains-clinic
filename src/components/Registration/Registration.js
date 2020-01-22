import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    name: '',
    email: '',
    userType: '',
    skillLevel: '',
    interest: '',
    question: ''
  });
  const [status, setStatus] = React.useState('notSubmitted');

  const inputLabel = React.useRef(null);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setStatus('submitting');
    domo.post(`/domo/datastores/v1/collections/ClinicRegistration/documents/`, {
      "content": values
    }).then(data => setStatus('submitted'));
  }

  if (status !== 'submitted') {
    return (
      <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          id="input-name"
          label="Name"
          value={values.name}
          onChange={handleChange('name')}
          className={classes.formControl}
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
        />
        <TextField
          required
          id="input-email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          className={classes.formControl}
          fullWidth
          margin="normal"
          variant="outlined"
          type="email"
        />
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
          <InputLabel ref={inputLabel} htmlFor="input-user-type">
            What type of user are you?
          </InputLabel>
          <Select
            value={values.userType}
            onChange={handleChange('userType')}
            labelWidth={200}
            inputProps={{
              name: 'userType',
              id: 'input-user-type'
            }}
          >
            <MenuItem value={'Technical User'}>Technical User</MenuItem>
            <MenuItem value={'Business User'}>Business User</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
          <InputLabel ref={inputLabel} htmlFor="input-skill-level">
            What do you think is your current skill level with Domo?
          </InputLabel>
          <Select
            value={values.skillLevel}
            onChange={handleChange('skillLevel')}
            labelWidth={400}
            inputProps={{
              name: 'skillLevel',
              id: 'input-skill-level'
            }}
          >
            <MenuItem value={'New to Domo'}>New to Domo</MenuItem>
            <MenuItem value={'Still a bit to learn'}>Still a bit to learn</MenuItem>
            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
            <MenuItem value={'Advanced'}>Advanced</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
          <InputLabel ref={inputLabel} htmlFor="input-interest">
            What are you interested in learning about?
          </InputLabel>
          <Select
            value={values.interest}
            onChange={handleChange('interest')}
            labelWidth={310}
            inputProps={{
              name: 'interest',
              id: 'input-interest'
            }}
          >
            <MenuItem value={'Collaboration'}>Collaboration</MenuItem>
            <MenuItem value={'Buzz'}>Buzz</MenuItem>
            <MenuItem value={'Chart Properties'}>Chart Properties</MenuItem>
            <MenuItem value={'Building Charts'}>Building Charts</MenuItem>
            <MenuItem value={'Domo Stories'}>Domo Stories</MenuItem>
            <MenuItem value={'Data Connection'}>Data Connection</MenuItem>
            <MenuItem value={'Domo Transformation Tools'}>Domo Transformation Tools (Beast Mode, DataFusion, MySQL, Magic ETL, Advanced Tools)</MenuItem>
            <MenuItem value={'Data Storytelling'}>Data Storytelling</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Do you have any specific questions to be covered during the Q&A?"
          value={values.question}
          onChange={handleChange('question')}
          className={classes.formControl}
          multiline
          rows="3"
          margin="normal"
          variant="outlined"
          fullWidth
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
        Thank you for registering!
      </Typography>
    );
  }
}

export default Registration;
