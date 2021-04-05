import React from 'react'
import Header from '../Header'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import SectionRenderer from './SectionRenderer'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import ApiCall from './../common/ApiCall'
const TemplateRenderer = (props) => {

  const history = useHistory()

  const handleSectionChange = (index, section) => {
    if (props.onChange) {
      let myTemplate = JSON.parse(JSON.stringify(props.template))
      myTemplate.sections[index] = section
      props.onChange(myTemplate)
    }
  }

  const back = () => {
    navigateTo()
  }
  const navigateTo=()=>{
    if(props.fromAdmin){
      history.push('/admin')
    }
    else{
      history.push('/cliniciandashboard')
    }
  }

  const save = () => {
    const template=props.template
   // create(props.template)
     //template.id = template.id ? template.id : id;
    if (props.isDefault) {
      create(template)
    } else {
      
    const userTemplateId=props.userTemplateId
      update(userTemplateId,template)
    } 
  }
  
  const create = (template) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI_SAVE
  //  console.log('Create API', uri);
     ApiCall(uri, 'POST', {
        name: template.name,
        description: template.description,
        template: JSON.stringify(template)
      })
      .then(res => {
        console.log('Response from template', res.headers.get('Location'));
        navigateTo()
      }) 
  }

  const update = (id,template) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI_SAVE + "/" + id
   // console.log('UPDATE API', uri);
    ApiCall(uri, 'PUT', {
        id: id,
        name: template.name,
        description: template.description,
        template: JSON.stringify(template)
      })
      .then(res => {
        console.log('Response from template', res)
        navigateTo();
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
        <Card variant="outlined" style={{width: '80%', marginTop: '20px'}}>
          <CardHeader
            title={props.template.name}
          />
          <CardContent>
              <Grid item>
                {props.template.description}
              </Grid>
          </CardContent>
          <CardActions>
            {
              props.fromAdmin &&
              <Button size='medium' onClick={back}
                      color="primary">Back</Button>
            }
            {
              !props.fromAdmin &&
              <Button size='medium' onClick={save}
                      color="primary">Save</Button>
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
