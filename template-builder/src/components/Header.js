import { AppBar, Toolbar } from "@material-ui/core"
import React from "react"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from './user/UserSlice'

const Header = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const doLogOut = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    history.push('/')
  }

  const displayDesktop = () => {
    return (
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              Welcome {props.userName}
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={doLogOut}>Logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      )
  };

  return (
    <header>
      <AppBar style={{width: '100%'}} position='static'>{displayDesktop()}</AppBar>
    </header>
  );
}

export default Header
