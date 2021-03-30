import React, { useState } from 'react';
import { Grid, TextField, Container, Button, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Question from './Question'
import Questions from './Questions'
import EditableText from './common/EditableText'

const Section = (props) => {

  const [newSection, setNewSection] = useState(props.section.name === '')

  const changeName = (value) => {
    let mySection = {...props.section}
    mySection.name = value
    props.onChange(props.index, mySection)
  }

  const addQuestion = () => {
    let mySection = {...props.section}
    mySection.questions.push({name: '', type: ''})
    props.onChange(props.index, mySection)
  }

  const handleQuestionChange = (index, question) => {
    let mySection = {...props.section}
    mySection.questions[index] = question
    props.onChange(props.index, mySection)
  }

  return (
    <React.Fragment>
      <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
      >

        <EditableText editMode={newSection} label="Name"
          value={props.section.name} onChange={changeName}/>
        <Button onClick={addQuestion}
                  color="primary">Add Question</Button>
        {
          props.section.questions &&
          props.section.questions.map((question, index) => {
            return (
              <Question key={index} index={index} question={question} onChange={handleQuestionChange}/>
            )
          })
        }
    </Grid>

    </React.Fragment>
  )
}

export default Section
