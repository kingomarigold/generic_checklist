import React, { useState } from 'react';
import { Grid, TextField, Container, Button, Typography, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

import NativeSelect from '@material-ui/core/NativeSelect';
import Questions from './Questions';/*
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));*/
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 480,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1, 1, 1, 1),
  },

}));
const Question = (props) => {
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
  const [quesvalue, setQuesValue] = useState('');
  const [optionValues, setOptionValues] = useState(false);
  const [optionval, setOptionVal] = useState('');

  const classes = useStyles();
  const [value, setValue] = useState('');

  const [addValue, setAddValue] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Choose wisely');
  const [option, setOption] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setOption(event.target.value);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [questionStructure, setQuestionStructure] = useState({ "question": "", "type": "", "option": "No Options" })

  let temp = { ...questionStructure }
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);

    if (event.target.value === 'radio' || event.target.value === 'checkbox' || event.target.value === 'dropdown') {
      temp.type = event.target.value;
      console.log("OPTions ", event.target.value)
      setOptionValues(true);

      console.log("OPTionValues ", optionValues)
      setQuestionStructure(temp);


    }
    else if (event.target.value === 'text' || event.target.value === 'textarea' || event.target.value === 'Date') {
      temp.type = event.target.value;
      setQuestionStructure(temp);

      setOptionValues(false)
      setHelperText('You got it!');
      setError(false);
      // setAddValue(true)
    }
    else {
      //  setAddValue(false)
      setHelperText('Please select an option.');
      setError(true);
    }

  };

  const handleSelect = (e) => {
    if (e.target.value) {
      setQuesValue(e.target.value)
      temp.question = e.target.value;
      setQuestionStructure(temp);
      setAddValue(true)

    }
    else if (e.target.value == "" || e.target.value == null) {
      setAddValue(false)
      console.log(addValue)
    }
  }
  const handleOptions = (e) => {
    setOptionVal(e.target.value)
    temp.option = e.target.value;
    setQuestionStructure(temp);
  }

  return (
    <React.Fragment>

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
            required
            defaultValue={quesvalue}
            onSelect={e => handleSelect(e)}
            options={question.map((option) => option.ques)}
            renderInput={(params) => (
              <TextField required {...params} id="standard-required" label="Questions" margin="normal" variant="outlined" />
            )}
          />

          <form >
            <FormControl required component="fieldset" error={error} className={classes.formControl}>
              <NativeSelect aria-label="quiz" name="quiz" value={value} onChange={e => handleRadioChange(e)}>
                <option value="select" label="select" />
                <option value="radio" label="radio" />
                <option value="checkbox" label="checkbox" />
                <option value="text" label="Input" />
                <option value="Date" label="Date" />
                <option value="dropdown" label="dropdown" />
                <option value="textarea" label="Textarea" />
              </NativeSelect>
              <FormHelperText>{helperText}</FormHelperText>


              {optionValues && <TextField id="outlined-basic"
                variant="outlined" placeholder="option 1 ,option 2" value={optionval} onChange={e => handleOptions(e)}>Add Options</TextField>}
            </FormControl>
          </form>  {addValue && <Grid container justify="flex-end">< Button type="submit" variant="contained" color="primary" component="span" href="#contained-buttons"
            onClick={() => props.handleAddQues(questionStructure)} className={classes.button}>ADD</Button></Grid>}



        </Container>
      </Grid>
    </React.Fragment>
  );

}
export default Question
