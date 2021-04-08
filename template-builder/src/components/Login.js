import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { Alert } from '@material-ui/lab';

const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const url=process.env.REACT_APP_BASE_URL + process.env.REACT_APP_LOGIN_URI

  const login = () => {
    const params = {
      username: userName,
      password: password
    }
    
    if (params.username) {
      if (params.password) {
       
    fetch(
      url,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
      }
    )
    .then(res => res.json())
    .then(json => {
      props.loginSuccess(json.id_token, userName, json.roles)
    })
    .catch(err => console.log('Error: ', err))

  }
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

}
}
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
         {props.error && <Alert severity="warning">
          Wrong   User name or password </Alert>}

        <Grid item>
          <TextField id="standard-basic" value={userName} label="User Name" onChange={(e) => setUserName(e.target.value)} />
        </Grid>
        <Grid item>
          <TextField id="standard-basic" value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </Grid>
        <Grid item>
          <Button style={{ marginTop: '10%' }} variant="contained" color="primary" onClick={login}> Login </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Login
