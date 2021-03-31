import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  
const url=process.env.REACT_APP_TOKEN
  const login = () => {
    // TODO - Connect to server and login.
    const token = 'abcdef'
  //let tokenurl = fetch(url);
 // console.log(token+"***")
    localStorage.setItem('token', token)
    props.loginSuccess()
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
