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

const Templates = (props) => {

const history = useHistory()

const editTemplate  = (id,template) => {
  console.log(id)
  history.push('/admin/template/'+id, {template:JSON.parse(template)})
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
          <TableCell >Frequency</TableCell>
          <TableCell >Clinic</TableCell>
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
                <TableCell component="th" scope="row"> {p.frequency} </TableCell>
                <TableCell component="th" scope="row"> {p.clinic} </TableCell>
                <TableCell component="th">
                  <IconButton onClick={() => editTemplate(p.id, p.template)}>
                    <EditIcon color="primary" />
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

export default Templates
