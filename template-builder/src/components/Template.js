import './Template.css'
import { Grid, Container, Button, Typography } from '@material-ui/core';
import React from 'react'
import Header from './Header'
import {useState} from 'react'
import Section from './Section'
import TextField from '@material-ui/core/TextField'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
//import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import ApiCall from './common/ApiCall'
import { useParams } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';


const Template = (props) => {
  const [newTemplate, setNewTemplate] = useState(props.location.state.template.name === '')
  const [template, setTemplate] = useState(props.location.state.template)

  const onSave = props.location.state.onSave

  const [section, setSection] = useState(false);
  const history = useHistory();
  const {id}= useParams();

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

  const handleDelete = (event, index) => {
    event.stopPropagation()
    let myTemplate = JSON.parse(JSON.stringify(template))
    myTemplate.sections.splice(index, 1)
    setTemplate(myTemplate)
  }

  const preview  = () => {
    template.id = id;
    history.push('/template', template)
  }

  const save = () => {
    template.id =template.id?template.id:id;
    if (template.id) {
      update(template.id)
    } else {
      create()
    }
  }
  
    const create = () => {
      const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__TEMPLATE_URI_SAVE
    //  console.log('Create API', uri);
       ApiCall(uri, 'POST', {
          name: template.name,
          description: template.description,
          clinic:template.clinic,
          category:template.category,
          frequency:template.frequency,
          template: JSON.stringify(template),
        })
        .then(res => {
          console.log('Response from template', res.headers.get('Location'));
          history.push('/admin')
        }) 
    }
  
    const update = (templateId) => {
      const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__TEMPLATE_URI_SAVE + "/" + templateId
     // console.log('UPDATE API', uri);
      ApiCall(uri, 'PUT', {
          id: template.id,
          name: template.name,
          clinic:template.clinic,
          category:template.category,
          frequency:template.frequency,
          description: template.description,
          template: JSON.stringify(template)
        })
        .then(res => {
          console.log('Response from template', res)
          history.push('/admin')
        }) 
    }
  
  const goBack = () => {
    history.push('/admin')
  }

  const categoryList = [
    'Physical Env Building Inspection',
    'General Audits',
    'Access Care',
    'Infection Prevention',
    'Other Audits',
    'Medical Record Audit ICHD',
    'Medical Record Audit PD',
    'Medical Record Audit HHD'
  ]
  //const [selectedCategory, setCategory] = useState('');

  const handleCategoryChange = (event) => {
    const myTemplate = {...template}
    myTemplate.category = event.target.value
    setNewTemplate(false)
    setTemplate(myTemplate)
    //setCategory(event.target.value);
  };

  const frequencyList=[ '"1" a Month','"3" a Month','"1" a Quarter', '"1" a Year']

  //const [selectedFrequency, setFrequency] = useState('');

  const handleFrequencyChange = (event) => {
    const myTemplate = {...template}
    myTemplate.frequency = event.target.value
    setNewTemplate(false)
    setTemplate(myTemplate)
   // setFrequency(event.target.value);
  };

  
  const clinicList=[ 'Clinic 1','Clinic 2','Clinic 3', 'Clinic 4']

  //const [selectedClinic, setClinic] = useState('');

  const handleClinicChange = (event) => {
    const myTemplate = {...template}
    myTemplate.clinic = event.target.value
    setNewTemplate(false)
    setTemplate(myTemplate)
    //setClinic(event.target.value);
  };
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
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
          <Grid  item xs={12} sm={6}>
          <CardContent style={{textAlign: "center"}}>
                <Grid item >
                  <TextField required label="Title"
                    value={template.name} onChange={(e) => changeName(e.target.value)} 
                      style={{width: '80%'}}/>
                </Grid>
                <Grid item>
                  <TextField multiline label='Description' value={template.description}
                    onChange={(e) =>changeDescription(e.target.value)}
                    helperText='You can add multiple lines here'     style={{width: '80%'}} / >
                </Grid>
            </CardContent>
          </Grid>
          <Grid  item xs={12} sm={6}>
            <CardContent >
                <Grid item >
                <TextField multiline label='Category' 
                  value={template.category}
                  onChange={(e) => handleCategoryChange(e)}  style={{width: '40%'}} / >
              <TextField
                  id="standard-select-freq"
                  select
                  label="Frequency"
                  value={template.frequency}
                 onChange={(e) => handleFrequencyChange(e)}
                 style={{width: '40%', paddingLeft:'10%'}}
                >
                {
                 frequencyList.map(freq => {
                    return (
                      <MenuItem key={freq} value={freq} >
                        {freq}
                      </MenuItem>
                    )
                  })
                }
              </TextField>
              </Grid>
              <br/>
              <Grid item >
                <TextField
                  id="standard-select-clinic"
                  select
                  label="Clinic"
                  value={template.clinic}
                 onChange={(e) => handleClinicChange(e)}
                 style={{width: '80%'}}
                >
                {
                clinicList.map(clinic => {
                    return (
                      <MenuItem key={clinic} value={clinic}>
                        {clinic}
                      </MenuItem>
                    )
                  })
                }
              </TextField>
              </Grid>
            </CardContent>
        </Grid>
           
            <CardActions style={{marginLeft: '30%'}} >
              <Button size='medium' variant="outlined" onClick={goBack}
                  color="default"  >Back</Button>
              <Button size='medium' onClick={addSection}
                      color="primary">Add Section</Button>
              <Button size='medium' onClick={preview}
                color="primary">Preview</Button>
              <Button size='medium' variant="outlined" onClick={save}
                  color="primary">Save</Button>
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
                      <Grid item>
                        <DeleteIcon onFocus={(event) => event.stopPropagation()}
                          onClick={(event) => handleDelete(event, index)}/>
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
