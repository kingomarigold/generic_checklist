import React from 'react'
import {useState} from 'react'
import TemplateRenderer from './clinician/TemplateRenderer'
import { useParams } from 'react-router-dom';

const TemplatePreview = (props) => {
  const [template, setTemplate] = useState(props.location.state)

  const {id}= useParams();
  console.log('Preview  Template ID: ', id)

  const handleTemplateChange = (changedTemplate) => {
    console.log('Changed Template: ', changedTemplate)
    setTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  return (
    <TemplateRenderer userName={props.userName} template={template}
      fromAdmin={props.location.fromAdmin===undefined} userTemplateId={id} isDefault={props.location.userId===undefined} onChange={handleTemplateChange}/>
  )
}

export default TemplatePreview
