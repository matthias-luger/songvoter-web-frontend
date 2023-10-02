'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import GoogleLogin from '@/components/GoogleLogin'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, TextField } from '@mui/material'
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
                                <InputLabel htmlFor="reasonField">Reason (optional)</InputLabel>
                                <TextField
                                    id="reasonField"
                                    multiline
                                    rows={5}
                                    style={{ width: '100%', paddingBottom: 15 }}
                                    onChange={e => {
                                        setText(e.target.value)
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        setShowConfirmDialog(true)
                                    }}
                                    variant="contained"
                                >
                                    Delete personal data
                                </Button>
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
                            It completely deletes your current user. This action is final and cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setShowConfirmDialog(false)
                            }}
                        >
                            Back
                        </Button>
                        <Button onClick={onDeletionConfirm} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    )
}
