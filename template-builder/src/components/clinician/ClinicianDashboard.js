import React, { useEffect, useState } from 'react'
import ApiCall from '../common/ApiCall'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TemplateRenderer from './TemplateRenderer'

const ClinicianDashboard = (props) => {

  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTemplate, setShowTemplate] = useState(false)

  const handleTemplateChange = (value) => {
    let myTemplate = templates.find(template => template.name === value)
    setSelectedTemplate(JSON.parse(JSON.stringify(myTemplate)))
  }

  const fillTemplate = () => {
    setShowTemplate(true)
  }

  const onAnswerChange = (changedTemplate) => {
    console.log('Changed Template: ', changedTemplate)
    setSelectedTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  useEffect(() => {
    let params = {}
    ApiCall(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TEMPLATE_URI,
      'GET',
      params)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setTemplates(json)
    })
  }, [])

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={selectedTemplate?.name}
            onChange={(e) => handleTemplateChange(e.target.value)}
            helperText="Please select a template"
          >
          {
            templates.map(template => {
              return (
                <MenuItem key={template.name} value={template.name}>
                  {template.name}
                </MenuItem>
              )
            })
          }
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} lg={5} md={5}>
        <Button variant='contained' color='primary' onClick={fillTemplate}>Fill Template</Button>
      </Grid>

      
    </Grid>
  )
}

export default ClinicianDashboard
