import React from 'react'
import Header from '../Header'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import SectionRenderer from './SectionRenderer'
import {Button,TextField} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ApiCall from '../common/ApiCall'

const TemplateRenderer = (props) => {

  const history = useHistory()
  console.log('Template is: ', props.template)

  const handleSectionChange = (index, section) => {
    if (props.onChange) {
      let myTemplate = JSON.parse(JSON.stringify(props.template))
      myTemplate.sections[index] = section
      props.onChange(myTemplate)
    }
  }

  const back = () => {
    history.push(props.back, {template: props.template})
  }

  const save = () => {
    const template=props.template
    if (props.isDefault) {
      create(template)
    } else {
    const userTemplateId=props.userTemplateId
      update(userTemplateId,template,"inprogress")
    }  
  }
  const submit =()=>{
    const template=props.template;
    const userTemplateId=props.userTemplateId
      update(userTemplateId,template,"done")
  }
  const create = (template) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI_SAVE
  //  console.log('Create API', uri);
     ApiCall(uri, 'POST', {
        name: template.name,
        category:template.category,
        status:"inprogress",
        description: template.description,
        template: JSON.stringify(template),
        frequency:template.frequency
      })
      .then(res => {
        console.log('Response from template', res.headers.get('Location'));
        back()
      }) 
  }

  const update = (id,template,status) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI_SAVE + "/" + id
   // console.log('UPDATE API', uri);
    ApiCall(uri, 'PUT', {
        id: id,
        name: template.name,
        status:status,
        description: template.description,
        frequency:template.frequency,
        template: JSON.stringify(template),
        category:template.category
      })
      .then(res => {
        console.log('Response from template', res)
        back();
      }) 
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
        <Card variant="outlined" style={{width: '80%', marginTop: '20px'}} >
          <CardHeader
            title={props.template.name}
          />
           <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
          <Grid  item xs={12} sm={6}>
          <CardContent style={{textAlign: "center"}}>
                <Grid item >
                  <TextField label="Name" InputProps={{ disableUnderline: true }}
                    value={props.template.name} disabled
                      style={{width: '80%'}}/>
                </Grid>
                <Grid item>
                <TextField label="Description" InputProps={{ disableUnderline: true }}
                    value={props.template.description} disabled
                      style={{width: '80%'}}/>
                </Grid>
            </CardContent>
          </Grid>
          <Grid  item xs={12} sm={6}>
          <CardContent style={{textAlign: "center"}}>
                <Grid item >
                <TextField label="Category" InputProps={{ disableUnderline: true }} 
                    value={props.template.category} disabled
                      style={{width: '80%'}}/>
                </Grid>
                <Grid item>
                <TextField label="Frequency" InputProps={{ disableUnderline: true }}
                    value={props.template.frequency} disabled
                      style={{width: '80%'}}/>
                </Grid>
                <Grid item>
                <TextField label="Clinic" InputProps={{ disableUnderline: true }}
                    value={props.template.clinic} disabled
                      style={{width: '80%'}}/>
                </Grid>
            </CardContent>
          </Grid>
          </Grid>
          <CardActions style={{marginLeft: '30%'}}>
            {
              <Button size='medium' onClick={back}
                      color="primary">Back</Button>
            }
            {
              !props.fromAdmin &&
              <Button size='medium' onClick={save}
                      color="primary">Save</Button>
            }
            {
              !props.fromAdmin &&
              <Button size='medium' onClick={submit}
                      color="primary">Submit</Button>
            } 
          </CardActions>
        </Card>
        {
          props.template.sections &&
          props.template.sections.map((section, index) => {
            return (
              <SectionRenderer key={index} index={index} section={section}
                onChange={handleSectionChange}/>
            )
          })
        }
      </Grid>
    </React.Fragment>
  )
}

export default TemplateRenderer
