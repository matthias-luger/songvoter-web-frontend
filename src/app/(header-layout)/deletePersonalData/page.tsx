'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import GoogleLogin from '@/components/GoogleLogin'
import { TextField } from '@mui/material'
import { CodeResponse } from '@react-oauth/google'

export default function Page() {
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [userId, setUserId] = useState(null)
    let [text, setText] = useState('')

    function onFeedbackSend() {
        fetch('https://feedback.coflnet.com/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Context: 'SongVoter',
                User: '',
                Feedback: JSON.stringify(text),
                FeedbackName: 'deletePersonalData'
            })
        })
    }

    function onAfterLogin(response: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) {
        setIsLoggedIn(true)
    }

    return (
        <>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        pt: 3,
                        pb: 6
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Request deletion of personal data
                        </Typography>
                        {!isLoggedIn ? (
                            <GoogleLogin />
                        ) : (
                            <TextField
                                multiline
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                            />
                        )}
                    </Container>
                </Box>
            </main>
        </>
    )
}
