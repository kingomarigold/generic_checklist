import React from 'react'
import {useState} from 'react'
import TemplateRenderer from './clinician/TemplateRenderer'

const TemplatePreview = (props) => {
  const [template, setTemplate] = useState(props.location.state)

  const handleTemplateChange = (changedTemplate) => {
    setTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  return (
    <TemplateRenderer userName={props.userName} template={template}
      fromAdmin={true} onChange={handleTemplateChange}/>
  )
}

export default TemplatePreview
