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

  return (
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
        props.section.questions.map((question,index) => {
          return (
            <React.Fragment>
                <Accordion style={{width: '80%', marginTop: '20px'}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item>
                     { question.name} 
                      </Grid>
                      <Grid item>
                        {question.type}
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Question key={index} question={question} index={index} />
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
          )
        })
      }

      </Grid>
  )
}

export default Section
