

import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import UserTemplateRenderer from './UserTemplateRenderer'

import TemplateRenderer from './TemplateRenderer'
import Header from '../Header'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'


const ClinicianDashboard = (props) => {
 
  const [template, setTemplate] = useState({})
  
  const [usertemplate, setUsertemplate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const handleTemplateChange = (idx) => {
    setUsertemplate(true)
    setTemplate(templates[idx])
   
  }

  
 const  getTemplates=()=>{
  const response =  fetch('http://localhost:3000/templates',{credentials:'include'})
  .then(response => response.json())
  .then(json => {
    setTemplates(json)
  })
   };
  useEffect(()=> {
    getTemplates();
  },[]);

  
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

  const classes = useStyles();
  const history = useHistory()


  return (
    <div>
        <Header userName={props.userName}/>
    
       <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
      <FormControl className={classes.formControl}>
         <Select
          native
         
          onChange={e=>handleTemplateChange(e.target.value)}
          inputProps={{
            name: 'templates',
            id: 'age-native-simple',
          }}
        >
          <option>select</option>
          {
      templates.length>0 &&
      templates.map((h, i) => 
      (<option key={i} value={i}>{h.name}</option>))
      }
        </Select>
      </FormControl>
    {usertemplate &&
    <UserTemplateRenderer userName={props.userName} template={template}
      fromAdmin={false} />
    }
      </Grid>
     
</div>
  )
}

export default ClinicianDashboard
/* { usertemplate &&
    <UserTemplateRenderer userName={props.userName} template={state.template}
      fromAdmin={false} />
    }
    */