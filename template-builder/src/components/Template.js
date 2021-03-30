import './Template.css'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Header from './Header'
import {useState} from 'react'
import Section from './Section'
import EditableText from './common/EditableText'

import { useHistory } from 'react-router-dom'



const Template = (props) => {
  const [newTemplate, setNewTemplate] = useState(props.location.state.name === '')
  const [template, setTemplate] = useState(props.location.state)

  const history = useHistory();
  const changeName = (name) => {
    const myTemplate = {...template}
    myTemplate.name = name
    setNewTemplate(false)
    setTemplate(myTemplate)
  }

  const functionSection = () => {
    history.push('/admin/template/section', {name: '', id: '', sections: []})
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
             <button style={{marginTop: '10px'}} onClick={functionSection}
                variant="contained" color="default">Add Section</button>
               
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
/*
import './Template.css'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Header from './Header'
import {useState} from 'react'
import Section from './Section'
import EditableText from './common/EditableText'

import { useHistory } from 'react-router-dom'
const Template = (props) => {
  const [newTemplate, setNewTemplate] = useState(props.location.state.name === '')
  const [template, setTemplate] = useState(props.location.state)
  const history = useHistory();
  const changeName = (name) => {
    const myTemplate = {...template}
    myTemplate.name = name
    setNewTemplate(false)
    setTemplate(myTemplate)
  }
console.log("props.location.state.name ",props.location.state.name);
  const addSec=(value)=>
  {
    console.log(value.sectionName)
  }

  const functionSection = () => {
    history.push('/admin/template/section', {name: '', id: '', sections: []})
  }
  return (
    <React.Fragment>
      <Header userName={props.userName}/>
      <Grid
        container
        justify="center"
      alignItems="center"
        direction="column"
        
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
          <div>
                <button style={{marginTop: '10px'}} onClick={functionSection}
                variant="contained" color="default">Add Section</button>
                </div>
                </div>

        }
        {
          props.sections &&
          props.sections.map(section => {
            return (
              <Section addSec={addSec}/>
            )
          })
        }
      </Grid>
    </React.Fragment>
  )
}

export default Template
*/