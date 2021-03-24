import './App.css'
import 'fontsource-roboto'
import Login from './components/Login'
import Admin from './components/Admin'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {  Route, Switch } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const history = useHistory()

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    // TODO - Handle role based authorization and redirect
    history.push('/admin')
  }

  useEffect(() => {
    // Removing this token for now so that we can test login
    localStorage.removeItem('token')
    let myToken = localStorage.getItem('token')
    if (myToken) {
      // TODO - Validate token with the server
      handleLoginSuccess()
    }
  }, [])

  return (
    <main>
      <Switch>
        <Route exact path='/' >
          <Login loginSuccess={handleLoginSuccess}/>
        </Route>
        {
          isLoggedIn &&
            <Route exact path='/admin' >
              <Admin />
            </Route>
        }
      </Switch>
    </main>
  );
}

export default App;
