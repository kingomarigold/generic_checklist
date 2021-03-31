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

  console.log(props.question)

  const handleRadioChange = (value) => {

  }

  const handleCheckboxChange = (value) => {
    console.log('Value: ', value)
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
                      checked={props.question.values && props.questions.values.includes(choice)}
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
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid
          container
          justify="flex-start"
          alignItems="center"
          direction="column"
      >
        <Grid item>
          {props.question.name}
        </Grid>
        <Grid item>
          {
            renderAnswer()
          }
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default QuestionRenderer
