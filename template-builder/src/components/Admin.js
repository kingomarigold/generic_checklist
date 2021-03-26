import React, { Component } from 'react';
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


class Admin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      templates: [],
      isLoading: false,
      isError: false,
      templateName: ''
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:3000/templates')
    if (response.ok) {
      const templates = await response.json()
      console.log(templates);
      this.setState({ templates, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  handleInputChange = (event) => {

    this.setState({
      templateName: event.target.value
    })
  }
  render() {
    const displayDesktop = () => {
      return <Toolbar>Hi From Desktop Header</Toolbar>;
    };
    return (
      <div >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
                this.state.templates.map((p, index) => {
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
}
export default Admin
//////////////////