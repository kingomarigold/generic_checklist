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
import { useSelector, useDispatch } from 'react-redux'
import { loggedIn, login, clinician, admin } from './components/user/UserSlice'

function App() {
  const isLoggedIn = useSelector(loggedIn)
  const isClinician = useSelector(clinician)
  const isAdmin = useSelector(admin)
  const dispatch = useDispatch()
  const history = useHistory()
  const url=process.env.REACT_APP_TOKEN

  const redirectToNextStep = (roles) => {
    console.log('Redirecting based on role: ', roles)
    if (roles.includes('ROLE_ADMIN')) {
      history.push('/admin')
    }
    else if (roles.includes('ROLE_USER')) {
      history.push('/cliniciandashboard')
    }
  }

  const handleLoginSuccess = (token, userName, roles) => {
    dispatch(login({
      name: userName,
      token: token,
      roles: roles
    }))
    localStorage.setItem('token', token)
    redirectToNextStep(roles)
  }


  return (
    <main>
      {
        !isLoggedIn &&
        <Login loginSuccess={handleLoginSuccess} />
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
