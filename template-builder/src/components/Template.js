import './Template.css'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Header from './Header'
import {useState} from 'react'
import Section from './Section'
import EditableText from './common/EditableText'
import EditableTextArea from './common/EditableTextArea'
import Divider from '@material-ui/core/Divider'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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

  const changeDescription = (value) => {
    const myTemplate = {...template}
    myTemplate.description = value
    setNewTemplate(false)
    setTemplate(myTemplate)
  }

  const addSection = () => {
    let myTemplate = { ...template }
    if(!myTemplate.sections) {
      myTemplate.sections = []
    }
    myTemplate.sections.push({name: '', questions: []})
    setTemplate(myTemplate)
  }

  const handleSectionChange = (index, section) => {
    let myTemplate = JSON.parse(JSON.stringify(template))
    myTemplate.sections[index] = section
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
        <Card variant="outlined" style={{width: '80%', marginTop: '20px'}}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <CardContent>

                <EditableText editMode={newTemplate} label="Name"
                  value={template.name} onChange={changeName} />
                <EditableTextArea label='Description' value={template.description}
                    onChange={changeDescription} />
            </CardContent>
            <CardActions>
              <Button size='medium' onClick={addSection}
                      color="primary">Add Section</Button>
            </CardActions>
          </Grid>
        </Card>


        {
          template.sections &&
          template.sections.map((section,index) => {
            return (
              <React.Fragment key={index}>
                <Accordion defaultExpanded={index === 0} style={{width: '80%', marginTop: '20px'}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        Section {index+1}
                      </Grid>
                      <Grid item>
                        {section.name}
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Section key={index} section={section} index={index} onChange={handleSectionChange}/>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
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
