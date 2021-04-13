import { AppBar, Toolbar } from "@material-ui/core"
import React from "react"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, userName } from './user/UserSlice'


import { makeStyles } from '@material-ui/core/styles';
const Header = React.memo((props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUserName = useSelector(userName)

  const doLogOut = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    history.push('/')
  }
  const usestyles = makeStyles({
    logo: {
      maxWidth: 150
    },
  });
  const displayDesktop = () => {

    const classes = usestyles();
    return (
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              Welcome {currentUserName}
            </Grid>
            <Grid item>
              <img src="/images/fresenius.jpg" className={classes.logo} />
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
})

export default Header
