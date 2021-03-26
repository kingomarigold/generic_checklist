import './App.css'
import 'fontsource-roboto'
import Login from './components/Login'
import Admin from './components/Admin'
import Section from './components/Section/index'
import AddQuestions from './components/AddQuestions/index'
import { useState, useEffect } from 'react'
import { Router, Route, Switch, BrowserRouter, useLocation } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    // Removing this token for now so that we can test login
    localStorage.removeItem('token')
    let myToken = localStorage.getItem('token')
    if (myToken) {
      // TODO - Validate token with the server
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <main>
      {
        !isLoggedIn &&
        <Login loginSuccess={handleLoginSuccess} />
      }
      {
        isLoggedIn &&
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Admin} />
            <Route exact path='/section' component={Section} ></Route>
          </Switch>
        </BrowserRouter>
      }
    </main>
  );
}


export default App;



//import AddQuestions from './components/AddQuestions/index'