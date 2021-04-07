import './App.css'
import 'fontsource-roboto'
import Login from './components/Login'
import Admin from './components/Admin'
import Template from './components/Template'
import TemplatePreview from './components/TemplatePreview'
import TemplateFill from './components/clinician/TemplateFill'
import { useState, useEffect } from 'react'
import { Router, Route, Switch, BrowserRouter, useHistory } from 'react-router-dom'
import Question from './components/Question'
import ClinicianDashboard from './components/clinician/ClinicianDashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isClinician, setIsClinician] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()
  const url = process.env.REACT_APP_TOKEN

  const redirectToNextStep = (roles) => {
    console.log('Redirecting based on role: ', roles)
    if (!roles) {
      //  console.log("****************")
      setIsLoggedIn(false)
      setError(true)
      //   console.log("eee",error)
    }
    else {

      if (roles.includes('ROLE_ADMIN')) {
        setIsLoggedIn(true)
        setIsAdmin(true)
        setIsClinician(false)
        setError(false)
        history.push('/admin')
      }
      else if (roles.includes('ROLE_USER')) {
        setIsLoggedIn(true)
        setIsClinician(true)
        setIsAdmin(false)
        setError(false)
        history.push('/cliniciandashboard')
      }
    }

  }

  const handleLoginSuccess = (token, userName, roles) => {
    //  setIsLoggedIn(true)
    localStorage.setItem('token', token)
    localStorage.setItem('userName', userName)
    localStorage.setItem('roles', roles)

    redirectToNextStep(roles)
  }

  useEffect(() => {
    // Removing this token for now so that we can test login
    localStorage.removeItem('token')
    let myToken = localStorage.getItem('token')

    if (myToken) {
      // TODO - Validate token with the server
      setIsLoggedIn(true)
      redirectToNextStep(localStorage.getItem('roles'))
    }
  }, [])
  console.log(error, "/app.js")
  return (
    <main>
      {
        !isLoggedIn &&
        <Login loginSuccess={handleLoginSuccess} error={error} />
      }
      {
        isLoggedIn &&
        isAdmin &&
        <Switch>
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/admin/template' component={Template} ></Route>
          <Route exact path='/admin/template/:id' component={Template} ></Route>
          <Route exact path='/template' component={TemplatePreview} ></Route>
        </Switch>
      }
      {
        isLoggedIn &&
        isClinician &&
        <Switch>
          <Route exact path='/cliniciandashboard' component={ClinicianDashboard} ></Route>
          <Route exact path='/template' component={TemplateFill} ></Route>
        </Switch>
      }
    </main>
  );
}


export default App;



//import AddQuestions from './components/AddQuestions/index'
