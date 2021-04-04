import React, { useEffect, useState } from 'react'
import ApiCall from '../common/ApiCall'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const ClinicianDashboard = (props) => {

  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleTemplateChange = (value) => {
    let myTemplate = templates.find(template => template.name === value)
    setSelectedTemplate(myTemplate)
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
      justify="flex-start"
      alignItems="center"
    >
    <TextField
        id="standard-select-currency"
        select
        label="Select"
        value={selectedTemplate?.name}
        onChange={(e) => handleTemplateChange(e.target.value)}
        helperText="Please select a template"
      >
        <MenuItem key='default' value ={null}>
           None
        </MenuItem>
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
  )
}

export default ClinicianDashboard
