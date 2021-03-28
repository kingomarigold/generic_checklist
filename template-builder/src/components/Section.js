import React, { useState } from 'react';
import { Grid, TextField, Container, Button, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Question from './Question';

export default function Section() {
    const [button, setButton] = useState(false);
    const [question, setQuestion] = useState(false);
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
    const handleQues = (e) => {
        setQuestion(true);
    }
    const handleSelect = (e) => {
        console.log("********", e.target.value)
        if (e.target.value) {
            setButton(true);
            setValue(e.target.value)
        }
        else {
            setButton(false);
        }
    }
 //   const sectionData=[{"sectionName":"","questions":[]}]
 const [sectionData,setSectionData]=useState({"sectionName":"","questions":[]})
    const handleAddQues=(value)=>{
        let temp={...sectionData}
        temp.questions.push(value);
        setSectionData(temp);
    }

    const [value, setValue] = useState();
    return (
        <Grid

            justify="center"
            alignItems="center"
            direction="column"
            style={{ minHeight: "100vh" }}
        >

            <Container maxWidth="sm">
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    {...defaultProps}
                    autoComplete
                    includeInputInList
                    defaultValue={value}
                    onSelect={e => handleSelect(e)}

                    renderInput={(params) => <TextField
                        {...params} label="Section name" margin="normal"
                    />}
                />
                {button && <Button variant="contained" color="primary" component="span" href="#contained-buttons" onClick={e => handleQues(e)}>
                    + Add Question </Button>}
                {question && <Question handleAddQues={handleAddQues} />}

            </Container>

        </Grid>
    );
}
