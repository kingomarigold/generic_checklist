import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { AppBar, Toolbar } from "@material-ui/core"
import Header  from './Header'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Templates from './Templates'


const Admin = (props) => {
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [templateName, setTemplateName] = useState('')

  const history = useHistory()

  const makeApiCall = (url, method, params, headers) => {
    setIsLoading(true)
    let  fetcher = method == 'GET' || method == 'HEAD'?fetch(
      url,
      {
        method: method
      }
    ):
    fetch(
      url,
      {
        method: method,
        body: params
      }
    )

    return fetcher
    .then(response => {
      setIsLoading(false)
      return response.json()
    }).
    catch(err => {
      setIsLoading(false)
      console.log('Error occured: ', err)
    })
    .then(response => [])
  }

  useEffect(()=> {
    let params = {}
    let headers = { token: localStorage.getItem('token') }
    makeApiCall(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TEMPLATE_URI,
      'GET',
      params, headers)
    .then(json => {
      console.log(json)
      setTemplates(json)
    })
  }, [])

  const handleInputChange = (event) => {
    setTemplateName(event.target.value)
  }

  const addTemplate = () => {
    history.push('/admin/template', {name: '', id: '', sections: []})
  }

  return(
    <React.Fragment>
      <Header userName='User'/>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Button style={{marginTop: '10px'}} onClick={addTemplate}
          variant="contained" color="default">Add Template</Button>
      </Grid>
      {
        templates.length > 0 &&
        <Templates templates={templates}/>
      }
    </React.Fragment>
  )
}

export default Admin
