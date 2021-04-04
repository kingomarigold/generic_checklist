import React from 'react'
import {useState} from 'react'
import TemplateRenderer from './TemplateRenderer'

const TemplateFill = (props) => {
  const [template, setTemplate] = useState(props.location.state)

  const handleTemplateChange = (changedTemplate) => {
    console.log('Changed Template: ', changedTemplate)
    setTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  return (
    <TemplateRenderer userName={props.userName} template={template}
      fromAdmin={false} onChange={handleTemplateChange} back='/cliniciandashboard'/>
  )
}

export default TemplateFill
