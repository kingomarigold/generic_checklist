import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  let headers = "Access-Control-Allow-Origin";
 
const url=process.env.REACT_APP_TOKEN
  const login = () => {
    // TODO - Connect to server and login.
    let params = {"name":userName,"password":password}
    const token = 'abcdef'
  let tokenurl =   makeApiCall("https://cors-anywhere.herokuapp.com/"+url,
    'GET',
    params, headers)
  .then(json => {
    console.log(json)
   
  })
 // console.log(token+"***")
    localStorage.setItem('token', tokenurl)
    props.loginSuccess()
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
  
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
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
