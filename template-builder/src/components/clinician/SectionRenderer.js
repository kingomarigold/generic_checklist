import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import QuestionRenderer from './QuestionRenderer'

const SectionRenderer = (props) => {
  console.log("props",props)
  const handleQuestionChange = (index, question) => {
    console.log(props.onChange,"???")
    if (props.onChange) {
      let section = {...props.section}
      section.questions[index] = question
      props.onChange(section)
    }
  }

  return (
    <React.Fragment >
      <Accordion style={{width: '80%', marginTop: '20px'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              Section {props.index+1}
            </Grid>
            <Grid item>
              {props.section.name}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
          {
            props.section.questions &&
            props.section.questions.map((question, index) => {
              return (
                <React.Fragment key={'frag_'+index}>
                  <hr  key={'hr_' + index}  style={{width: '100%', height: '1px', marginTop: '20px', backgroundColor: 'grey', border: 'none'}}/>
                  <Grid  key={'grid_' + index}  item >
                    <span style={{paddingTop:'10px', paddingBottom: '10px'}}>
                      <h3>Question {index+1}</h3>
                    </span>
                  </Grid>
                  <QuestionRenderer key={'question_' + index} index={index} question={question} onChange={handleQuestionChange}/>
                </React.Fragment>
              )
            })
          }
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default SectionRenderer