import React from 'react'
import {useState} from 'react'
import TemplateRenderer from './clinician/TemplateRenderer'
import { useParams } from 'react-router-dom';

const TemplatePreview = (props) => {
  const [template, setTemplate] = useState(props.location.state)

  //Need to validate and remove
  const {id}= useParams();
  console.log('Preview  Template ID: ', id)

  const handleTemplateChange = (changedTemplate) => {
    console.log('Changed Template: ', changedTemplate)
    setTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  return (
    <TemplateRenderer userName={props.userName} template={template}
      fromAdmin={true} onChange={handleTemplateChange} back='/admin/template'/>
  )
}

export default TemplatePreview
