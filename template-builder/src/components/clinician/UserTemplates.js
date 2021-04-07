import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom';
import {Grid,Button,} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react'

const UserTemplates = (props) => {

const history = useHistory()
const [templates, setTemplates] = useState([])
const [selectedTemplate, setSelectedTemplate] = useState(null)

const editTemplate  = (id,template) => {
  console.log(id)
  history.push('/1001/template/'+id, {template:JSON.parse(template)})
}

const fillTemplate = (p) => {
    history.push('/template', {template:JSON.parse(p.template), userTemplateId: p.id, isDefault:(p.userId===undefined)})
}

return (
  <TableContainer component={Paper}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>

          <TableCell >Category</TableCell>
          <TableCell >Name</TableCell>
          <TableCell >Description</TableCell>
          <TableCell >Last Updated date</TableCell>
          <TableCell >Due date</TableCell>
          <TableCell >Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.templates.map((p, index) => {
            return (
              <TableRow key={index} >
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell component="th" scope="row"> {p.category} </TableCell>
                <TableCell component="th" scope="row">{p.name}</TableCell>
                <TableCell component="th" scope="row"> {p.description} </TableCell>
                <TableCell component="th" scope="row"> </TableCell>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell component="th">
                  <IconButton onClick={() => fillTemplate(p)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  </TableContainer>
)
}

export default UserTemplates
