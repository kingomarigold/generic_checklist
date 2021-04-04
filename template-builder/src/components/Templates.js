import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom';

const Templates = (props) => {
  const isEdit= (props.isEdit===true)?(props.isEdit):false
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.templates.map((p, index) => {
              return (
                <TableRow key={index} >
                  <TableCell component="th" scope="row">
                    {p.id}
                  </TableCell>
                  <TableCell component="th" scope="row">{p.name}</TableCell>
                  <TableCell component="th" scope="row"> {p.description} </TableCell>
                  <TableCell component="th" scope="row"> 
                  {(isEdit===true)
                      ? <Link to={{pathname: '/template/'+p.id, state: JSON.parse(p.template) }}>Fill</Link>
                      : <Link to={{pathname: '/admin/template/'+p.id, state: { template:JSON.parse(p.template)} }}>Edit</Link>
                  }

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
