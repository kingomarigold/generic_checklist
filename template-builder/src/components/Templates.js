import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'


const Templates = (props) => {
  return (
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
            props.templates.map((p, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {p.id}
                  </TableCell>
                  <TableCell >{p.name}</TableCell>
                  <TableCell > </TableCell>
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
