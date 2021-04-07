import React, { useState } from 'react'
import { Grid, TextField, Container, Button, Typography, Select, MenuItem, InputLabel } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'


const Question = (props) => {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }))


  const [error, setError] = useState(props.error);

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

  const questionTypes = [
    { value: '1', name: 'Options - radio' },
    { value: '2', name: 'Options - checkbox' },
    { value: '3', name: 'Options - select' },
    { value: '4', name: 'Input - Textbox' },
    { value: '5', name: 'Input - Textarea' },
    { value: '6', name: 'Widget - Date' },
  ]

  const baseHelperText = 'Enter your choices separated by comma'
  const [newQuestion, setNewQuestion] = useState(props.question.name === '')
  const [hasError, setHasError] = useState('')
  const [helperText, setHelperText] = useState(baseHelperText)
  const classes = useStyles()

  const changeName = (value) => {
    let myQuestion = { ...props.question }
    myQuestion.name = value
    props.onChange(props.index, myQuestion)
  }

  const handleMultipleChoice = (value) => {
    let myQuestion = { ...props.question }
    let choices = []
    if (value) {
      choices = value.split(',').map(choice => choice.trim())
    }
    myQuestion.choices = choices
    props.onChange(props.index, myQuestion)
  }

  const handleChange = (value) => {
    let myQuestion = { ...props.question }
    myQuestion.type = value
    props.onChange(props.index, myQuestion)
  }

  return (
    <React.Fragment>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={12} sm={12} lg={5} md={5}>
          <TextField style={{ width: '100%' }} required label='Name' value={props.question.name}
            onChange={(e) => changeName(e.target.value)} />
          {props.error && props.error[props.sectionIndex][props.index]?.name && <div className="error-msg" style={{ color: 'red' }}> question is required</div>}
        </Grid>
        <Grid item xs={12} sm={12} lg={5} md={5}>
          <TextField
            style={{ width: '100%' }}
            value={props.question.type}
            label='Type'
            select
            onChange={(e) => handleChange(e.target.value)}
          >
            {
              questionTypes.map(question => {
                return (
                  <MenuItem value={question.value}>{question.name}</MenuItem>
                )
              })
            }
          </TextField>
          {props.error && props.error[props.sectionIndex][props.index]?.type && <div className="error-msg" style={{ color: 'red' }}> type is required</div>}
        </Grid>
        {
          props.question.type &&
          parseInt(props.question.type) < 4 &&
          <Grid item xs={12} sm={12} lg={11} md={11}>
            <TextField
              required
              style={{ width: '100%' }}
              helperText={helperText}
              value={props.question.choices ? props.question.choices.join(', ') : ''}
              label='Choices'
              placeholder='Option 1, Option 2'
              onChange={(e) => handleMultipleChoice(e.target.value)}
            />
            {props.error && props.error[props.sectionIndex][props.index]?.choices && <div className="error-msg" style={{ color: 'red' }}> choices are required</div>}
          </Grid>
        }
      </Grid>
    </React.Fragment>
  );

}
export default Question
