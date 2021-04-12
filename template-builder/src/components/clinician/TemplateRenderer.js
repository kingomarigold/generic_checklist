import React from 'react'
import Header from '../Header'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import SectionRenderer from './SectionRenderer'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ApiCall from '../common/ApiCall'
import TokenRefresh from '../common/TokenRefresh'
import { Snackbar } from '@material-ui/core';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const TemplateRenderer = (props) => {


  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'msg'
  });

  const { vertical, horizontal, open, message } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }))

  const classes = useStyles()
  const history = useHistory()
  console.log('Template is: ', props.template)

  const handleSectionChange = (index, section) => {
    if (props.onChange) {
      let myTemplate = JSON.parse(JSON.stringify(props.template))
      myTemplate.sections[index] = section
      props.onChange(myTemplate)
    }
  }

  const back = () => {
    history.push(props.back, { template: props.template })
  }


  const submitmsg = () => {
    const newState = { vertical: 'top', horizontal: 'right', message: 'Submitted Successfully!' }
    setState({ open: true, ...newState });
  }
  const savemsg = () => {
    const newState = { vertical: 'top', horizontal: 'right', message: 'Saved Successfully!' }
    setState({ open: true, ...newState });
  }
  const errormsg = () => {
    const newState = { vertical: 'top', horizontal: 'right', message: 'Unable to save. Please try again later!' }
    setState({ open: true, ...newState });
  }


  const save = () => {
    const template = props.template
    if (props.isDefault) {
      create(template, true)
    } else {
      const userTemplateId = props.userTemplateId
      update(userTemplateId, template, "inprogress", true)
    }
  }
  const submit = () => {
    const template = props.template;
    const userTemplateId = props.userTemplateId
    update(userTemplateId, template, "done", true)
  }
  const create = (template, attemptedRefresh) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI_SAVE
    //  console.log('Create API', uri);
    ApiCall(uri, 'POST', {
      name: template.name,
      category: template.category,
      status: "inprogress",
      description: template.description,
      template: JSON.stringify(template),
      frequency: template.frequency
    }, setIsLoading)
      .then(res => {
        if (res.status !== 403) {
          return true
        }
        else {
          return new Promise((resolve, reject) => {
            resolve(null)
          })
        }
      })
      .then(json => {
        if (json) {
          console.log(json)
          // console.log('Response from template', res.headers.get('Location'));
          savemsg();
          setTimeout(() => {
            back();
          }, 3000)
        }
        else {
          if (attemptedRefresh) {
            TokenRefresh()
              .then(res => {
                console.log('Refreshed token with response create: ', res)
                if (res) {
                  create(template, false)
                }
              })
          }
        }
      })
  }

  const update = (id, template, status, attemptedRefresh) => {
    const uri = process.env.REACT_APP_BASE_URL + process.env.REACT_APP__USER_TEMPLATE_URI_SAVE + "/" + id
    // console.log('UPDATE API', uri);
    ApiCall(uri, 'PUT', {
      id: id,
      name: template.name,
      status: status,
      description: template.description,
      frequency: template.frequency,
      template: JSON.stringify(template),
      category: template.category
    }, setIsLoading)
      .then(res => {
        if (res.status !== 403) {
          return true
        }
        else {
          return new Promise((resolve, reject) => {
            resolve(null)
          })
        }
      })
      .then(json => {
      if (json) {
          if (status == 'done') {
            submitmsg()
          }
          else {
            savemsg()
          }
          setTimeout(() => {
            back();
          }, 3000)
        }
        else {
          if (attemptedRefresh) {
            TokenRefresh()
              .then(res => {
                console.log('Refreshed token with response update: ', res)
                if (res) {
                  update(id, template, status, false)
                }
              })
          }
          else {
            errormsg()
            setTimeout(() => {
              back();
            }, 3000)

          }
        }

      })
      .catch(error => { console.log(error) })
  }

  

  return (
    <React.Fragment>
      <Header userName={props.userName} />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Backdrop open={isLoading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Card variant="outlined" style={{ width: '80%', marginTop: '20px' }} >
          <CardHeader
            title={props.template.name}
          />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <CardContent style={{ textAlign: "center" }}>
                <Grid item >
                  <TextField label="Name" InputProps={{ disableUnderline: true }}
                    value={props.template.name} disabled
                    style={{ width: '80%' }} />
                </Grid>
                <Grid item>
                  <TextField label="Description" InputProps={{ disableUnderline: true }}
                    value={props.template.description} disabled
                    style={{ width: '80%' }} />
                </Grid>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent style={{ textAlign: "center" }}>
                <Grid item >
                  <TextField label="Category" InputProps={{ disableUnderline: true }}
                    value={props.template.category} disabled
                    style={{ width: '80%' }} />
                </Grid>
                <Grid item>
                  <TextField label="Frequency" InputProps={{ disableUnderline: true }}
                    value={props.template.frequency} disabled
                    style={{ width: '80%' }} />
                </Grid>
                <Grid item>
                  <TextField label="Clinic" InputProps={{ disableUnderline: true }}
                    value={props.template.clinic} disabled
                    style={{ width: '80%' }} />
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
          <CardActions style={{ marginLeft: '30%' }}>
            {
              <Button size='medium' onClick={back}
                color="primary">Back</Button>
            }
            {
              !props.fromAdmin &&
              <div>
                <Button size='medium' onClick={save}
                  color="primary">Save</Button>
                <Snackbar autoHideDuration={2000}
                  anchorOrigin={{ vertical, horizontal }}
                  key={`${vertical},${horizontal}`}
                  open={open}
                  onClose={handleClose}
                  message={message}
                />
              </div>
            }
            {
              !props.fromAdmin &&
              <Button size='medium' onClick={submit}
                color="primary">Submit</Button>
            }
          </CardActions>
        </Card>
        {
          props.template.sections &&
          props.template.sections.map((section, index) => {
            return (
              <SectionRenderer key={index} index={index} section={section}
                onChange={handleSectionChange} />
            )
          })
        }
      </Grid>
    </React.Fragment>
  )
}

export default TemplateRenderer
