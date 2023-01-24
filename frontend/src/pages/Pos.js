import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { ROOT_URL } from "../constants"



const API_URL = 'http://127.0.0.1:5000/pos'

export default function POS() {
    const [inputText, setInputText] = React.useState('')
    const [outPut, SetOutput] = React.useState(null)
    const [loading, setloading] = React.useState(false)


    const onChange = (e) => {
        setInputText(e.target.value)
    }



    const sentSentance = async () => {
        if (!inputText) {
            return
        } else {
            try {
                const data = {
                    data: inputText
                }
                setloading(true)
                const response = await axios.post(`${ROOT_URL}/pos`, data)
                SetOutput(response.data)
                setloading(false)
            } catch (error) {
                setloading(false)
                console.log(error)
            }
        }
    }

    const nouns = outPut?.filter(item => item.pos === "NOUN")
    const verbs = outPut?.filter(item => item.pos === "VERB")
    const adjs = outPut?.filter(item => item.pos === "ADJ")
    const p_nouns = outPut?.filter(item => item.pos === "PROPN")




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
                        label="Provide Your Text"
                        multiline
                        fullWidth
                        rows={10}
                        variant="standard"
                        onChange={onChange}
                        value={inputText}
                    />
                </div>
            </Box>

            {loading ? <CircularProgress /> : <Button sx={{ mb: 3, mt: 3 }} onClick={sentSentance} variant="contained">Submit</Button>}

            <Stack direction="row" spacing={2}>
                <Typography variant="h5" gutterBottom>
                    {"Nouns"}
                </Typography>

                <Typography sx={{ pl: 2 }} variant="h5" gutterBottom>
                    {"Verb"}
                </Typography>

                <Typography sx={{ pl: 2 }} variant="h5" gutterBottom>
                    {"Adjective"}
                </Typography>

                <Typography sx={{ pl: 2 }} variant="h5" gutterBottom>
                    {"Proper Noun"}
                </Typography>



            </Stack>
            <Divider />

            <Stack direction="row" spacing={2}>
                <Box>
                    {nouns?.map((sent) => (
                        <Box key={sent.id} sx={{ mt: 1 }}>
                            <Typography variant="body2" gutterBottom>
                                {sent.text}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>

                <Box sx={{ pl: 2 }}>
                    {verbs?.map((sent) => (
                        <Box key={sent.id} sx={{ mt: 1 }}>
                            <Typography variant="body2" gutterBottom>
                                {sent.text}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>
                <Box sx={{ pl: 2 }}>
                    {adjs?.map((sent) => (
                        <Box key={sent.id} sx={{ mt: 1 }}>
                            <Typography variant="body2" gutterBottom>
                                {sent.text}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>

                <Box sx={{ pl: 2 }}>
                    {p_nouns?.map((sent) => (
                        <Box key={sent.id} sx={{ mt: 1 }}>
                            <Typography variant="body2" gutterBottom>
                                {sent.text}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>



            </Stack>
        </>

    );
}