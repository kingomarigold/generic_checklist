
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import SectionRenderer from './SectionRenderer'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

const UserTemplateRenderer = (props) => {

  const history = useHistory()

  const [template, setTemplate] = useState(props.template)

  console.log(template,"**")
  const handleSectionChange = (index, section) => {
    if (props.onChange) {
        console.log("sec")
      let myTemplate = JSON.parse(JSON.stringify(props.template))
      myTemplate.sections[index] = section
      props.onChange(myTemplate)
    }
  }

  const back = () => {
    history.push('/admin/template', props.template)
  }

  const save = () => {
    // TODO - Add later
  }

  useEffect(()=> {
    const response =  fetch('http://localhost:3000/templates',{credentials:'include'})
    .then(response => response.json())
    .then(json => {
      setTemplate(json[props.template])
    })
  })

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Card variant="outlined" style={{width: '80%', marginTop: '20px'}}>
          <CardHeader
            title={template.name}
          />
          <CardContent>
              <Grid item>
                {template.description}
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
          template.sections &&
          template.sections.map((section, index) => {
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

export default UserTemplateRenderer
