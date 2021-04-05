import React, { useEffect, useState } from 'react'
import ApiCall from '../common/ApiCall'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TemplateRenderer from './TemplateRenderer'
import { useHistory } from 'react-router-dom'
import Header  from './../Header'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 150,
    width: 180,
  },
  gridName:{
    margin: "auto"
  }
}));


const ClinicianDashboard = (props) => {

  const history = useHistory()
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const classes = useStyles();

  const handleTemplateChange = (value) => {
    let myTemplate = templates.find(template => template.name === value)
    setSelectedTemplate(JSON.parse(JSON.stringify(myTemplate)))
  }

  const fillTemplate = () => {
    if (selectedTemplate) {
      history.push('/template', JSON.parse(selectedTemplate.template))
    }
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
  const dashboardCount=[{"name":"Todo","count":"5","color":"primary"},{"name":"InProgress","count":"10","color":"secondary"},{"name":"Completed","count":"20","color":"textPrimary"},{"name":"Overdue","count":"5","color":"error"}];

  return (
    <React.Fragment>
   <Header userName='Clinician'/>
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid container justify="center" spacing={10}>
          {dashboardCount.map((item,i) => (
            <Grid key={i} item >
              <Card className={classes.card}>
                <CardHeader title={item.name} align="center" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" align="center" color={item.color} > 
                    {item.count}
                  </Typography>
              </CardContent>
             </Card>
            </Grid>
          ))}
        </Grid>
        <br/>
        <br/>
        <br/>
        <br/>
        <Divider variant="middle" />

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
            templates && templates.map(template => {
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
    </React.Fragment> 

  )
}

export default ClinicianDashboard
