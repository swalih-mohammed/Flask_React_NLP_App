import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/system';


const API_URL = 'http://127.0.0.1:5000/compare'

export default function MultilineTextFields() {
    const [outPut, SetOutput] = React.useState(0)
    const [text1, setTex1] = React.useState('')
    const [text2, setTex2] = React.useState('')
    const [loading, setloading] = React.useState(false)


    const onChange1 = (e) => {
        setTex1(e.target.value)
    }
    const onChange2 = (e) => {
        setTex2(e.target.value)
    }


    const handle_submit = async () => {
        if (!text1 || !text2) {
            return
        } else {
            try {
                const data = {
                    text1: text1,
                    text2: text2
                }
                setloading(true)
                const response = await axios.post(API_URL, data)
                SetOutput(response.data)
                console.log(response.data)
                setloading(false)
            } catch (error) {
                setloading(false)
                console.log(error)
            }
        }
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="standard-multiline-static"
                        label="First Text"
                        multiline
                        fullWidth
                        rows={5}
                        variant="standard"
                        onChange={onChange1}
                        value={text1}
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Second Text"
                        multiline
                        fullWidth
                        rows={5}
                        variant="standard"
                        onChange={onChange2}
                        value={text2}
                    />
                </div>
            </Box>

            {loading ? <CircularProgress sx={{ mb: 3, mt: 3 }} /> : <Button sx={{ mb: 3, mt: 3 }} onClick={handle_submit} variant="contained">Submit</Button>}

            <Box>
                <Box sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h3" gutterBottom>
                            {"Similarity: "}
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {outPut * 100 + "%"}
                        </Typography>
                    </Stack>
                </Box>

            </Box>
        </>

    );
}