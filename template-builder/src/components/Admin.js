import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { AppBar, Toolbar } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const Admin = (props) => {
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [templateName, setTemplateName] = useState('')


  const makeApiCall = (url, method, params, headers) => {
    setIsLoading(true)
    let  fetcher = method == 'GET' || method == 'HEAD'?fetch(
      url,
      {
        method: method
      }
    ):
    fetch(
      url,
      {
        method: method,
        body: params
      }
    )

    return fetcher
    .then(response => {
      setIsLoading(false)
      return response.json()
    }).
    catch(err => {
      setIsLoading(false)
      console.log('Error occured: ', err)
    })
    .then(response => [])
  }

  useEffect(()=> {
    let params = {}
    let headers = { token: localStorage.getItem('token') }
    makeApiCall(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TEMPLATE_URI,
      'GET',
      params, headers)
    .then(json => {
      console.log(json)
      setTemplates(json)
    })
  }, [])

  const handleInputChange = (event) => {
    setTemplateName(event.target.value)
  }

  const displayDesktop = () => {
    return <Toolbar>Hi From Desktop Header</Toolbar>;
  };

  return(
    <div >
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <Link to="/section">
          <Button variant="contained" color="primary" disableElevation>
            + Add Template
          </Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              templates.map((p, index) => {
                return <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {p.id}
                  </TableCell>
                  <TableCell >{p.name}</TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Admin
