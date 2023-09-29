'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getPartyController } from '@/utils/ApiUtils'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import { getLoadingElement } from '@/utils/LoadingUtils'
import { toast } from 'react-toastify'

export default function Page({ params }: any) {
    let router = useRouter()
    let [failedToJoinParty, setFailedToJoinParty] = useState(false)

    useEffect(() => {
        joinParty()
    }, [])

    async function joinParty() {
        try {
            let partyController = await getPartyController()
            await partyController.apiPartyInviteIdJoinPost({
                inviteId: params.inviteId
            })
            router.push('/party')
        } catch (e) {
            toast.error('Failed to join party...')
            setFailedToJoinParty(true)
        }
    }

    return (
        <>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        pt: 8,
                        pb: 6
                    }}
                >
                    <Container maxWidth="sm">
                        {!failedToJoinParty ? (
                            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                                Joining party...
                            </Typography>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h1" variant="h4" align="center" color="text.primary" gutterBottom>
                                    Failed to join party.
                                </Typography>
                                <Typography component="h1" variant="h4" align="center" color="text.primary" gutterBottom>
                                    Are you sure the link is correct?
                                </Typography>
                                <Button
                                    style={{ display: 'flex', alignSelf: 'center' }}
                                    variant="outlined"
                                    onClick={() => {
                                        router.push('/')
                                    }}
                                >
                                    Back
                                </Button>
                            </div>
                        )}
                        {!failedToJoinParty ? getLoadingElement(<></>) : null}
                    </Container>
                </Box>
            </main>
        </>
    )
}
