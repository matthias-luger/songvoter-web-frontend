'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { getPartyController } from '@/utils/ApiUtils'
import Header from '@/components/Header'

export default function Page(params: any) {
    useEffect(() => {
        joinParty()
    }, [])

    async function joinParty() {
        let partyController = await getPartyController()
        partyController.partyInviteIdJoinPost({
            inviteId: params.inviteId
        })
    }

    return (
        <>
            <Header />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        pt: 8,
                        pb: 6
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Joining party...
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so
                            folks don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </>
    )
}
