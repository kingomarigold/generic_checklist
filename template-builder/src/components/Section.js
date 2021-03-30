import React, { useState } from 'react';
import { Grid, TextField, Container, Button, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Question from './Question';

import { useHistory } from 'react-router-dom'
import Questions from './Questions';
const Section = (props) => {
    const url = process.env.REACT_APP__TEMPLATE_URI_SAVE
  
    const [button, setButton] = useState(false);
    const [disable, setDisable] = useState(false);
    const [submitSection, setSubmitSection] = useState(false);
    const [question, setQuestion] = useState(false);

    const history = useHistory()

    const section = [
        { title: 'Para' },
        { title: 'wara' },
        { title: 'qwer' },
        { title: 'ccccc' },
        { title: 'qwsdfgh' },
    ];
    const defaultProps = {
        options: section,
        getOptionLabel: (option) => option.title,
    };
    const flatProps = {
        options: section.map((option) => option.title),
    };
    const handleSelect = (e) => {
        if (e.target.value) {
            setButton(true);
            setValue(e.target.value)
        }
        else {
            setButton(false);
        }
    }


    const [sectionData, setSectionData] = useState({ "sectionName": "", "questions": [] })


    const handleQues = (e) => {
        setDisable(true);
        setQuestion(true);
        setSubmitSection(true);
        sectionData.sectionName = value;
    }
    const handleAddQues = (value) => {

        let temp = { ...sectionData }
        temp.questions.push(value);
        setSectionData(temp);
        setQuestion(false);
        console.log(temp, "00000")
    }

    const [value, setValue] = useState();
    const addTemplate = () => {
        // props.addSec(sectionData);
        const handleSaveToPC = (jsonData,filename) => {
            const fileData = JSON.stringify(jsonData);
        //    const clob = new Clob([fileData], {type: "text/plain"});
        //    const url = URL.createObjectURL(clob);
            const link = document.createElement('a');
            link.download = `${filename}.json`;
            link.href = url;
            link.click();
          }
        history.push('/admin/template', { name: '', id: '', sections: [] })
    }
    return (
        <Grid

            justify="center"
            alignItems="center"
            direction="column"
            style={{ minHeight: "100vh" }}
        >

            <Container maxWidth="sm">
                <Autocomplete
                    id="section-name-complete"
                    freeSolo
                    {...defaultProps}
                    autoComplete
                    includeInputInList
                    defaultValue={value}
                    onSelect={e => handleSelect(e)}
                    disabled={disable}
                    renderInput={(params) => <TextField variant="outlined"
                        {...params} label="Section name" margin="normal"
                    />}
                />

                {button && <Grid container justify="flex-end"><Button variant="contained" color="primary" component="span" href="#contained-buttons" onClick={e => handleQues(e)}>
                    + Add Question </Button> </Grid>}
                {
                    sectionData.questions.length > 0 &&
                    <Questions questions={sectionData.questions} />
                }

                {question && <Question handleAddQues={handleAddQues} />}
                <Grid container justify="center">
                    {submitSection &&
                        <Button variant="contained" color="primary" component="span" href="#contained-buttons" onClick={addTemplate} onSubmit={() =>
                            props.addSec(sectionData)}>
                            Submit </Button>}
                </Grid>
            </Container>

        </Grid>
    );
}

export default Section
  /*{
      sectionData.questions.length > 0 &&
      <Questions questions={sectionData.questions} />
    }*/