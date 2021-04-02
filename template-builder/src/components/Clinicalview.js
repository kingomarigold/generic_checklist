
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import UserTemplateRenderer from './clinician/UserTemplateRenderer'

import Header from './Header'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
const Clinicalview = (props) => {
  const [template, setTemplate] = useState()
  
  const [usertemplate, setUsertemplate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const handleTemplateChange = (changedTemplate) => {
    setTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  
   
  useEffect(()=> {
    const response =  fetch('http://localhost:3000/templates',{credentials:'include'})
    .then(response => response.json())
    .then(json => {
      setTemplates(json)
    })
  })

  
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
  const [state, setState] =useState();

  const history = useHistory()
const handleChange=(e)=>{
console.log(e.target.value)
setUsertemplate(true)
setTemplate(e.target.value)
}

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
          value={state}
          onChange={e=>handleChange(e)}
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


      </Grid>
      { usertemplate &&
    <UserTemplateRenderer userName={props.userName} template={template}
      fromAdmin={false}/>
    }
</div>
  )
}

export default Clinicalview
