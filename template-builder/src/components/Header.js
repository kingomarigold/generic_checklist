import { AppBar, Toolbar } from "@material-ui/core"
import React from "react"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const Header = (props) => {

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
              <Button color="inherit">Logout</Button>
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
