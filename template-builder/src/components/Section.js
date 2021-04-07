import React, { useState } from 'react';
import { Grid, TextField, Container, Button, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Question from './Question'
import Questions from './Questions'
import EditableText from './common/EditableText'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
const Section = (props) => {

  const [newSection, setNewSection] = useState(props.section.name === '')

  console.log(props.error)
  const changeName = (value) => {
    let mySection = { ...props.section }
    mySection.name = value
    props.onChange(props.index, mySection)


  }

  const addQuestion = () => {
    let mySection = { ...props.section }
    mySection.questions.push({ name: '', type: '', choices: [] })
    props.onChange(props.index, mySection)
  }

  const handleQuestionChange = (index, question) => {
    let mySection = { ...props.section }
    mySection.questions[index] = question
    props.onChange(props.index, mySection)
  }
  //console.log("errors child",props.error)
  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <TextField required label="Name"
          value={props.section.name} onChange={(e) => changeName(e.target.value)} />
        {props.error && props.error[props.index]?.name && <div className="error-msg" style={{ color: 'red' }}> section name is required</div>}
        <Button onClick={addQuestion}
          color="primary">Add Question</Button>
        {
          props.section.questions &&
          props.section.questions.map((question, index) => {
            return (
              <React.Fragment>
                <hr key={'hr_' + index} style={{ width: '100%', height: '1px', marginTop: '20px', backgroundColor: 'grey', border: 'none' }} />
                <Grid key={'grid_' + index} item >
                  <span style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <h3>Question {index + 1}</h3>
                  </span>
                </Grid>
                <Question key={'question_' + index} sectionIndex={props.index} index={index} question={question} onChange={handleQuestionChange} error={props.questionErrors} />
              </React.Fragment>
            )
          })
        }
      </Grid>

    </React.Fragment>
  )
}

export default Section
