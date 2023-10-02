'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import GoogleLogin from '@/components/GoogleLogin'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { CodeResponse } from '@react-oauth/google'
import { getUserController } from '@/utils/ApiUtils'

export default function Page() {
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [showConfirmDialog, setShowConfirmDialog] = useState(false)
    let [text, setText] = useState('')

    async function onDeletionConfirm() {
        if (text) {
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
        let userController = await getUserController()
        userController.apiUserDelete()
    }

    async function onAfterLogin() {
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
                            Deletion of personal data
                        </Typography>
                        {!isLoggedIn ? (
                            <GoogleLogin onAfterLogin={onAfterLogin} />
                        ) : (
                            <Box>
                                <TextField
                                    multiline
                                    onChange={e => {
                                        setText(e.target.value)
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        setShowConfirmDialog(true)
                                    }}
                                />
                            </Box>
                        )}
                    </Container>
                </Box>
                <Dialog
                    open={showConfirmDialog}
                    onClose={() => {
                        setShowConfirmDialog(false)
                    }}
                >
                    <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete all your personal data?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Completely deletes your current user. This action is final and cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setShowConfirmDialog(false)
                            }}
                        >
                            Disagree
                        </Button>
                        <Button onClick={onDeletionConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    )
}
