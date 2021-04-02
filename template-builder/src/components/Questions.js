import React, { useState } from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit';

import { useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';

const Questions = (props) => {
    

  const history = useHistory();
  
const handleEdit=(value)=>{
  console.log("Editt")
  
  history.push('/admin/template/edit', { id: 'value'})
  }
const handleDelete=(value)=>{
  console.log("Delete")
}
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell >Type</TableCell>
            <TableCell >Options</TableCell>
            <TableCell >Edit</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.questions.map((p, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {p.question}
                  </TableCell>
                  <TableCell >{p.type}</TableCell>
                  <TableCell >{p.option}</TableCell>
                  <TableCell><EditIcon onClick={() => handleEdit(index)}/></TableCell>
                  <TableCell > <DeleteIcon onClick={() => handleDelete(index)} /></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Questions
