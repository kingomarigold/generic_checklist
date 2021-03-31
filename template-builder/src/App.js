import './App.css'
import 'fontsource-roboto'
import Login from './components/Login'
import Admin from './components/Admin'
import Template from './components/Template'
import TemplatePreview from './components/TemplatePreview'
import { useState, useEffect } from 'react'
import { Router, Route, Switch, BrowserRouter, useHistory } from 'react-router-dom'
import Question from './components/Question'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const history = useHistory()
const url=process.env.REACT_APP_TOKEN
  const handleLoginSuccess = () => {
    setIsLoggedIn(true)

    // TODO - Change depending on Role
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
      {
        !isLoggedIn &&
        <Login loginSuccess={handleLoginSuccess} />
      }
      {
        isLoggedIn &&
        <BrowserRouter>
          <Switch>
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/admin/template' component={Template} ></Route>
            <Route exact path='/template' component={TemplatePreview} ></Route>
          </Switch>
        </BrowserRouter>
      }
    </main>
  );
}


export default App;



//import AddQuestions from './components/AddQuestions/index'
