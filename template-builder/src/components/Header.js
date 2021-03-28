import { AppBar, Toolbar } from "@material-ui/core"
import React, { useEffect } from "react"
import Button from '@material-ui/core/Button'
import { Home, ThreeDRotation } from '@material-ui/icons'

const Header = (props) => {

  const displayDesktop = () => {
    return (
        <Toolbar>
          Welcome {props.userName}
          <Button color="inherit">Logout</Button>
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
