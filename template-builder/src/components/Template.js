import './Template.css'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Header from './Header'
import {useState} from 'react'
import Section from './Section'
import EditableText from './common/EditableText'

const Template = (props) => {
  const [newTemplate, setNewTemplate] = useState(props.location.state.name === '')
  const [template, setTemplate] = useState(props.location.state)

  const changeName = (name) => {
    const myTemplate = {...template}
    myTemplate.name = name
    setNewTemplate(false)
    setTemplate(myTemplate)
  }

  return (
    <React.Fragment>
      <Header userName={props.userName}/>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <EditableText editMode={newTemplate} label="Name"
          value={template.name} onChange={changeName}/>
        {
          props.sections &&
          props.sections.map(section => {
            return (
              <Section />
            )
          })
        }
      </Grid>
    </React.Fragment>
  )
}

export default Template
