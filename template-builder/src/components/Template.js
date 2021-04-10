import './Template.css'
import { Grid, Container, Button, Typography } from '@material-ui/core';
import React from 'react'
import Header from './Header'
import { useState } from 'react'
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
import { makeStyles } from '@material-ui/core/styles'
import TokenRefresh from './common/TokenRefresh'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const Template = (props) => {
  const [newTemplate, setNewTemplate] = useState(props.location.state.template.name === '')
  const [template, setTemplate] = useState(props.location.state.template)

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }))

  const classes = useStyles()

  const onSave = props.location.state.onSave
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [isLoading, setIsLoading] = useState(false)

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [section, setSection] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const changeName = (name) => {
    const myTemplate = { ...template }
    myTemplate.name = name
    setNewTemplate(false)
    setTemplate(myTemplate)
  }

  const changeDescription = (value) => {
    const myTemplate = { ...template }
    myTemplate.description = value
    setNewTemplate(false)
    setTemplate(myTemplate)
  }

  const addSection = () => {
    let myTemplate = { ...template }
    if (!myTemplate.sections) {
      myTemplate.sections = []
    }
    myTemplate.sections.push({ name: '', questions: [] })
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

  const preview = () => {
    template.id = id;
    history.push('/template', template)
  }

  const templateValues = ["name", "description", "category", "frequency", "clinic"]
  const sectionValues = ["name"]
  const questionValues = ["name", "type", "choices"]



  const [templateErrors, setTemplateErrors] = useState();
  const [sectionErrors, setSectionErrors] = useState();

  const [questionErrors, setQuestionErrors] = useState();
  const validate = () => {
    let tempErrors = {};
    let secErrors = [];
    let quesErrors = [];
    let success = true;
    //   console.log("errors parent", tempErrors)
    let errors = {}
    //  const myTemplate = {...template}

    templateValues.forEach(field => {
      if (!template[field]) {
        tempErrors[field] = true;
        success = false;
      }
      else {
        tempErrors[field] = false;
      }
    })
    //  console.log("Inside",tempErrorss)
    setTemplateErrors(tempErrors)

    template.sections.forEach((section, index) => {


      //section check  [{ {name:true},{name:false} }]
      sectionValues.forEach(field => {
        if (!section[field]) {
          secErrors.push({ [field]: true });
          success = false;
        }
        else {
          secErrors.push({ [field]: false });
        }
      })

      //questions check
      /* n,t,c*/
      section.questions.forEach((ques, idx) => {
        questionValues.forEach(values => {

          if (values == "choices" ? (ques[values].length < 1 && ques.type < 3) : !ques[values]) {

            if (quesErrors[index]) {
              if (quesErrors[index][idx]) {
                quesErrors[index][idx][values] = true
                success = false;
              }
              else {

                quesErrors[index].push({ [values]: true });
                success = false;
                //   quesErrors.push({ [values]: true });
              }
            }
            else {
              quesErrors.push([]);
              quesErrors[index].push({ [values]: true });
              success = false;
            }
          }
          else {
            if (quesErrors[index]) {

              if (quesErrors[index][idx]) {
                quesErrors[index][idx][values] = false
              } else {
                quesErrors[index].push({ [values]: false });
                //   quesErrors.push({ [values]: false });
              }
            }
            else {
              quesErrors.push([]);
              quesErrors[index].push({ [values]: false });
            }
          }
        })

      })

    })
    setSectionErrors(secErrors);

    setQuestionErrors(quesErrors)
    if (success) {
      save();
    }
  }



  const save = () => {
    template.id = template.id ? template.id : id;
    if (template.id) {
      update(template.id)
    } else {
      create(true)
    }
  }

  const create = (attemptRefresh) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__TEMPLATE_URI_SAVE
    //  console.log('Create API', uri);
    ApiCall(uri, 'POST', {
      name: template.name,
      description: template.description,
      clinic: template.clinic,
      category: template.category,
      frequency: template.frequency,
      template: JSON.stringify(template),
    }, setIsLoading)
      .then(res => {
        if (res.status === 201) {
          return true
        }
        else {
          return new Promise((resolve, reject) => {
            resolve(null)
          })
        }
      })
      .then(json => {
        if (json) {
          setTimeout(() => {
            history.push('/admin')
          }, 3000)
          const newState = { vertical: 'top', horizontal: 'right' }
          setState({ open: true, ...newState });
        }
        else {
          if (attemptRefresh) {
            console.log('Refreshing Token ')
            TokenRefresh()
              .then(res => {
                console.log('Refreshed token with response: ', res)
                if (res) {
                  create(false)
                }
              })
          }
        }

      })
  }

  const update = (templateId) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__TEMPLATE_URI_SAVE + "/" + templateId
    // console.log('UPDATE API', uri);
    ApiCall(uri, 'PUT', {
      id: template.id,
      name: template.name,
      clinic: template.clinic,
      category: template.category,
      frequency: template.frequency,
      description: template.description,
      template: JSON.stringify(template)
    }, setIsLoading)
      .then(res => {
        console.log('Response from template', res)
        setTimeout(() => {
          history.push('/admin')
        }, 3000)
        const newState = { vertical: 'top', horizontal: 'right' }
        setState({ open: true, ...newState });

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
    const myTemplate = { ...template }
    myTemplate.category = event.target.value
    setNewTemplate(false)
    setTemplate(myTemplate)
    //setCategory(event.target.value);
  };

  const frequencyList = ['"1" a Month', '"3" a Month', '"1" a Quarter', '"1" a Year']

  //const [selectedFrequency, setFrequency] = useState('');

  const handleFrequencyChange = (event) => {
    const myTemplate = { ...template }
    myTemplate.frequency = event.target.value
    setNewTemplate(false)
    setTemplate(myTemplate)
    // setFrequency(event.target.value);
  };


  const clinicList = ['Clinic 1', 'Clinic 2', 'Clinic 3', 'Clinic 4']

  //const [selectedClinic, setClinic] = useState('');

  const handleClinicChange = (event) => {
    const myTemplate = { ...template }
    myTemplate.clinic = event.target.value
    setNewTemplate(false)
    setTemplate(myTemplate)
    //setClinic(event.target.value);
  };
  return (
    <React.Fragment>
      <Header userName={props.userName} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Backdrop open={isLoading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

        <Card variant="outlined" style={{ width: '80%', marginTop: '20px' }}>
          <CardContent style={{ textAlign: "center" }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} lg={5} md={5}>
                <TextField required label="Title" style={{ width: '100%' }}
                  value={template.name} onChange={(e) => changeName(e.target.value)} />
                {templateErrors?.name && <div className="error-msg" style={{ color: 'red' }}>
                  name is required</div>}

              </Grid>
              <Grid item xs={12} sm={12} lg={5} md={5}>
                <TextField multiline label='Description' value={template.description}
                  onChange={(e) => changeDescription(e.target.value)}
                  style={{ width: '100%' }} />
                {templateErrors?.description && <div className="error-msg" style={{ color: 'red' }}>
                  description is required</div>}
              </Grid>
              <Grid item xs={12} sm={12} lg={5} md={5}>
                <TextField multiline label='Category'
                  value={template.category}
                  style={{ width: '100%' }}
                  onChange={(e) => handleCategoryChange(e)} />
                {templateErrors?.category && <div className="error-msg" style={{ color: 'red' }}>
                  category is required</div>}

              </Grid>
              <Grid item xs={12} sm={12} lg={5} md={5}>
                <TextField
                  id="standard-select-freq"
                  select
                  label="Frequency"
                  value={template.frequency}
                  style={{ width: '100%' }}
                  onChange={(e) => handleFrequencyChange(e)}
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
                {templateErrors?.frequency && <div className="error-msg" style={{ color: 'red' }}>
                  frequency is required</div>}

              </Grid>
              <Grid item xs={12} sm={12} lg={5} md={5}>
                <TextField
                  id="standard-select-clinic"
                  select
                  label="Clinic"
                  style={{ width: '100%' }}
                  value={template.clinic}
                  onChange={(e) => handleClinicChange(e)}
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
                {templateErrors?.clinic && <div className="error-msg" style={{ color: 'red' }}>
                  clinic is required</div>}

              </Grid>
            </Grid>
          </CardContent>

          <CardActions  >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} sm={6} lg={2} md={3}>
                <Button size='medium' variant="outlined" onClick={goBack}
                  color="default"  >Back</Button>
              </Grid>
              <Grid item xs={6} sm={6} lg={2} md={3}>
                <Button size='medium' onClick={addSection}
                  color="primary">Add Section</Button>
              </Grid>
              <Grid item xs={6} sm={6} lg={2} md={3}>
                <Button size='medium' onClick={preview}
                  color="primary">Preview</Button>
              </Grid>
              <Grid item xs={6} sm={6} lg={2} md={3}>
                <Button size='medium' variant="outlined" onClick={validate}
                  color="primary">Save</Button>
              </Grid>
              <Snackbar autoHideDuration={2000}
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                message="Saved Successfully!!"
              />
            </Grid>
          </CardActions>
        </Card>


        {
          template.sections &&
          template.sections.map((section, index) => {
            return (
              <React.Fragment key={index}>
                <Accordion defaultExpanded={index === 0} style={{ width: '80%', marginTop: '20px' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        Section {index + 1}
                      </Grid>
                      <Grid item>
                        {section.name}
                      </Grid>
                      <Grid item>
                        <DeleteIcon onFocus={(event) => event.stopPropagation()}
                          onClick={(event) => handleDelete(event, index)} />
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Section key={index} section={section} index={index} onChange={handleSectionChange} error={sectionErrors} questionErrors={questionErrors} />
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
