import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { AppBar, Toolbar } from "@material-ui/core"
import Header  from './Header'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Templates from './Templates'
import ApiCall from './common/ApiCall'
import TokenRefresh from './common/TokenRefresh'

const Admin = (props) => {
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const history = useHistory()


  const fetchTemplates = (attemptRefresh) => {
    let params = {}
    ApiCall(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TEMPLATE_URI,
      'GET',
      params)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      else {
        return new Promise((resolve, reject) => {
          resolve(null)
        })
      }
    })
    .then(json => {
      if (json) {
        console.log(json)
        setTemplates(json)
      }
      else {
        if (attemptRefresh) {
          console.log('Refreshing Token ')
          TokenRefresh()
          .then(res => {
            console.log('Refreshed token with response: ', res)
            if (res) {
              fetchTemplates(false)
            }
          })
        }
      }
    })
  }

  useEffect(()=> {
    fetchTemplates(true)
  }, [])


  const addTemplate = () => {
    history.push('/admin/template', {template:{name: '', id: '', sections: []}})
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
        <Templates templates={templates} sections={templates} />
      }
    </React.Fragment>
  )
}

export default Admin
