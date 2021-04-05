import React from 'react'
import {useState} from 'react'
import TemplateRenderer from './TemplateRenderer'

const TemplateFill = (props) => {
  const [template, setTemplate] = useState(props.location.state.template)

  const handleTemplateChange = (changedTemplate) => {
    console.log('Changed Template: ', changedTemplate)
    setTemplate(JSON.parse(JSON.stringify(changedTemplate)))
  }

  return (
    <TemplateRenderer userName={props.userName} template={template}
      fromAdmin={false} userTemplateId={props.location.state.userTemplateId} isDefault={props.location.state.isDefault}  onChange={handleTemplateChange} back='/cliniciandashboard'/>
  )
}

export default TemplateFill
