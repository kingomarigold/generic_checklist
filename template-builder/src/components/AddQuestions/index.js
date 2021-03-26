import React,{useState} from 'react';
import { Grid, TextField, Container, Button, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const AddQuestions = (props) => {
  const question = [
    { ques: 'What type of clients do you do your best work with?' },
    { ques: 'Do you utilize any particular modalities with clients?' },
    { ques: 'If so, can you tell me more about how you incorporate the modality into your work?' },

    { ques: 'Why did you choose to become a supervisor?' },
    { ques: 'How many people have you supervised?' },
    { ques: 'How would your supervisees describe your approach to supervision?' },
    { ques: 'How will you challenge me to become a better therapist?' },
    { ques: ' How will we incorporate self- of - the - therapist work in our supervision ?' },
    { ques: 'Logistically, what days / times are you available for supervision ?' },
    { ques: 'How should I handle questions that come up between sessions, in both emergency and non - emergency situations ?' },
    {
      ques: 'How often will we review the licensure requirements in my state to ensure I am on track ?'
    },
    { ques: 'Has your license ever been suspended or revoked by a state board?' },
    {
      ques: 'How many supervision hours can I anticipate collecting with you each month ?'
    },
  ];
  const defaultProps = {
    options: question,
    getOptionLabel: (option) => option.ques,
  };
  const flatProps = {
    options: question.map((option) => option.ques),
  };


  const classes = useStyles();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Choose wisely');
  const questionStructure = {
    "question": '', "type": ""
  }
  const handleRadioChange = (event) => {
    console.log(event.target.value,"1111")
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
    questionStructure.type = event.target.value;
    console.log(questionStructure.type,'2222')
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'radio' || value === 'checkbox' || value === 'text' ||
      value === 'textarea' || value === 'Date' || value === 'dropdown' || value === 'matrix') {
      setHelperText('You got it!');
      setError(false);
    }
    else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };
  const handleSelect = (e) => {
    console.log("********", e.target.value)
    if (e.target.value) {
       
        setValue(e.target.value)
    }
}

  return (
    <Grid
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Container maxWidth="sm">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          defaultValue={value}
          onSelect={e => handleSelect(e)}
          options={question.map((option) => option.ques)}
          renderInput={(params) => (
            <TextField {...params} label="Questions" margin="normal" variant="outlined" />
          )}
        />


      </Container>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" error={error} className={classes.formControl}>
          <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={e => handleRadioChange(e)}>
            <FormControlLabel value="radio" control={<Radio />} label="Multiple choice - radio" />
            <FormControlLabel value="checkbox" control={<Radio />} label="Multiple choice - checkbox" />
            <FormControlLabel value="text" control={<Radio />} label="Input" />
            <FormControlLabel value="Date" control={<Radio />} label="Date" />
            <FormControlLabel value="dropdown" control={<Radio />} label="Select dropdown" />
            <FormControlLabel value="matrix" control={<Radio />} label="Matrixscale" />
            <FormControlLabel value="textarea" control={<Radio />} label="Textarea" />
          </RadioGroup>
          <FormHelperText>{helperText}</FormHelperText>
          <Button type="submit" variant="outlined" color="primary" onClick={() => props.handleAddQues(questionStructure)} className={classes.button}>ADD</Button>
        </FormControl>
      </form>
    </Grid>
  );
}
export default AddQuestions;