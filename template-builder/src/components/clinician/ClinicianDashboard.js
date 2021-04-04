import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar } from "@material-ui/core"
import Header  from './../Header'
import { useHistory } from 'react-router-dom'
import Templates from './../Templates'
import ApiCall from './../common/ApiCall'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Grid, TextField, Container, Button, Typography, Select, MenuItem, InputLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 150,
    width: 180,
  },
  gridName:{
    margin: "auto"
  }
}));


const ClinicianDashboard = (props) => {
  
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const history = useHistory()

  const classes = useStyles();


  
  useEffect(()=> {
    let params = {}
    ApiCall(process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI,
      'GET',
      params)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setTemplates(json)
    })
  }, []);


  const dashboardCount=[{"name":"Todo","count":"5","color":"primary"},{"name":"InProgress","count":"10","color":"secondary"},{"name":"Completed","count":"20","color":"textPrimary"},{"name":"Overdue","count":"5","color":"error"}];
  return (

    <React.Fragment>
      <Header userName='User'/>

      <Grid container 
      direction="row"
      alignItems="center"
      >
      <Grid item xs={12}>
        <Grid container justify="center" spacing={10}>
          {dashboardCount.map((item,i) => (
            <Grid key={i} item >
              <Card className={classes.card}>
                <CardHeader title={item.name} align="center" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" align="center" color={item.color} > 
                    {item.count}
                  </Typography>
              </CardContent>
             </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Divider variant="middle" />

       { templates.length > 0 &&
        <Templates templates={templates} sections={templates}  isEdit={true} />
       }
      </Grid>

    </React.Fragment> 
     )
}

export default ClinicianDashboard
