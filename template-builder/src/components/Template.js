import './Template.css'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Header from './Header'
import {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Section from './Section'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const Template = (props) => {
  const [editableName, setEditableName] = useState(props.location.state.name === '')
  const [template, setTemplate] = useState(props.location.state)

  const changeName = (name) => {
    const myTemplate = {...template}
    myTemplate.name = name
    setTemplate(myTemplate)
  }

  return (
    <React.Fragment>
      <Header userName={props.userName}/>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        {
          editableName &&
          <TextField  required id="standard-required" label="Name" value={template.name}
          onChange={(e) => changeName(e.target.value)} onBlur={() => setEditableName(false)}/>
        }
        {
          !editableName &&
          <div className='template-name-container'>
            <div>{template.name}</div>
            <EditOutlinedIcon onClick={() => setEditableName(true)}  />
          </div>
        }
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
