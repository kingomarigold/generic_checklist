import React from 'react'
import Header from '../Header'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import SectionRenderer from './SectionRenderer'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { Snackbar } from '@material-ui/core';
import { useState } from 'react'

const TemplateRenderer = (props) => {

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    console.log("**********")
  };

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

  const save = () => {

    const newState = { vertical: 'top', horizontal: 'right' }
    setState({ open: true, ...newState });
    // TODO - Add later
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
        <Card variant="outlined" style={{ width: '80%', marginTop: '20px' }}>
          {
            console.log('Template Name: ', props.template.name)
          }
          <CardHeader
            title={props.template.name}
          />
          <CardContent>
            <Grid item>
              {props.template.description}
            </Grid>
          </CardContent>
          <CardActions>
            {
              <Button size='medium' onClick={back}
                color="primary">Back</Button>
            }
            {
              !props.fromAdmin &&
              <div>
                <Button size='medium' onClick={save} color="primary">Save</Button>
                <Snackbar autoHideDuration={2000}
                  anchorOrigin={{ vertical, horizontal }}
                  key={`${vertical},${horizontal}`}
                  open={open}
                  onClose={handleClose}
                  message="Saved Successfully!!"
                />
              </div>
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