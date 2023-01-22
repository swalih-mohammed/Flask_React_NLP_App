import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';


const API_URL = 'http://127.0.0.1:5000/sentace-separator'

export default function MultilineTextFields() {
    const [userSent, setUserSent] = React.useState('')
    const [sentances, setSentances] = React.useState(null)
    const [loading, setloading] = React.useState(false)


    const onChange = (e) => {
        setUserSent(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (userSent) {
            sentSentance()
        }
    }

    const sentSentance = async () => {
        if (!userSent) {
            return
        } else {
            try {
                const data = {
                    data: userSent
                }
                setloading(true)
                const response = await axios.post(API_URL, data)
                setSentances(response.data)
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
                        label="Provide your Sentance"
                        multiline
                        fullWidth
                        rows={10}
                        variant="standard"
                        onChange={onChange}
                        value={userSent}
                    />
                </div>
            </Box>

            {loading ? <CircularProgress /> : <Button sx={{ mb: 3, mt: 3 }} onClick={sentSentance} variant="contained">Submit</Button>}
            <Box>
                {sentances?.map((sent) => (
                    <Box key={sent.id} sx={{ mt: 1 }}>
                        <Typography variant="body2" gutterBottom>
                            {sent.text}
                        </Typography>
                        <Divider />
                    </Box>
                ))}
            </Box>
        </>

    );
}