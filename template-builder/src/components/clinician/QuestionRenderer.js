import { Grid, TextField, Container, Button, Typography, Select, MenuItem, InputLabel } from '@material-ui/core'
import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'

const QuestionRenderer = (props) => {

  const handleRadioChange = (value) => {
    let myQuestion = JSON.parse(JSON.stringify(props.question))
    myQuestion.value = value
    props.onChange(props.index, myQuestion)
  }
console.log(props,"ques")
  const handleCheckboxChange = (value) => {
    let myQuestion = JSON.parse(JSON.stringify(props.question))
    if (!myQuestion.values) {
      myQuestion.values = []
    }
    if (myQuestion.values.includes(value)) {
      myQuestion.values = myQuestion.values.filter(myValue => value !== myValue)
    }
    else {
      myQuestion.values.push(value)
    }
    props.onChange(props.index, myQuestion)
  }

  const handleSelectChange = (value) => {
    handleRadioChange(value)
  }

  const handleInputChange = (value) => {
    handleRadioChange(value)
  }

  const renderRadio = () => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Choice</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={props.question.value}
          onChange={e => handleRadioChange(e.target.value)}>
          {
            props.question.choices &&
            props.question.choices.map(choice => {
              return (
                <FormControlLabel value={choice} control={<Radio />} label={choice} />
              )
            })
          }
        </RadioGroup>
      </FormControl>
    )
  }

  const renderCheckbox = () => {
    return (
      <FormControl component="fieldset" >
          <FormLabel component="legend">Select your choice</FormLabel>
          <FormGroup>
            {
              props.question.choices &&
              props.question.choices.map(choice => {
                return (
                  <FormControlLabel
                    control={<Checkbox
                      checked={props.question.values && props.question.values.includes(choice)}
                      onChange={e => handleCheckboxChange(choice)} name={choice} />}
                    label={choice}
                  />
                )
              })
            }
          </FormGroup>
      </FormControl>
    )
  }

  const renderSelect = () => {
    return (
      <TextField
        style={{width: '100%'}}
        value={props.question.value}
        label='Select Choice'
        select
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        {
          props.question.choices &&
          props.question.choices.map(choice => {
            return (
              <MenuItem value={choice}>{choice}</MenuItem>
            )
          })
        }
      </TextField>
    )
  }

  const renderTextBox = () => {
    return (
      <TextField
        style={{width: '100%'}}
        value={props.question.value}
        label='Answer here'
        onChange={(e) => handleInputChange(e.target.value)}
      />
    )
  }

  const renderTextArea = () => {
    return (
      <TextField
        multiline
        rowsMax={4}
        style={{width: '100%'}}
        value={props.question.value}
        label='Answer here'
        onChange={(e) => handleInputChange(e.target.value)}
      />
    )
  }

  const renderAnswer = () => {
    return (
      <React.Fragment>
      {
        props.question.type === '1' &&
        renderRadio()
      }
      {
        props.question.type === '2' &&
        renderCheckbox()
      }
      {
        props.question.type === '3' &&
        renderSelect()
      }
      {
        props.question.type === '4' &&
        renderTextBox()
      }
      {
        props.question.type === '5' &&
        renderTextArea()
      }
      </React.Fragment>
    )
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
          {props.question.name}
        </Grid>
        <Grid item xs={12} sm={12} lg={5} md={5}>
          {
            renderAnswer()
          }
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default QuestionRenderer
