import React, { useState, useEffect } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import TextField from '@material-ui/core/TextField'

const EditableText = (props) => {
  const [editMode, setEditMode] = useState(props.editMode)


  return (
    <React.Fragment>
      {
        editMode &&
        <div className='editable-text-container'>
          <TextField   required id="standard-required" label={props.label} value={props.value}
          inputRef={input => input && input.focus()}
          onChange={(e) => props.onChange(e.target.value)} onBlur={() => setEditMode(false)}/>
          <EditOutlinedIcon disabled  />
        </div>
      }
      {
        !editMode &&
        <div className='editable-text-container'>
          <TextField  disabled  value={props.value} />
          <EditOutlinedIcon onClick={() => setEditMode(true)}  />
        </div>
      }
    </React.Fragment>
  )
}

export default EditableText
