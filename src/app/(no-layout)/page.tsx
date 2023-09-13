'use client'
import { Box, Button, Card, CardContent, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
    let router = useRouter()
    let [partyId, setPartyId] = useState('')

    function onPartyJoin() {
        if (partyId.includes('/invite/')) {
            let id = partyId.split('/invite/')[1]
            router.push(`/invite/${id}`)
        } else {
            router.push(`/invite/${partyId}`)
        }
    }

    return (
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
                        SongVoter
                    </Typography>
                    <Paper style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography component="p" variant="h6" align="center" color="text.primary" gutterBottom paragraph textAlign={'left'}>
                            Want to join a party?
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <TextField placeholder="Enter party ID" value={partyId} onChange={e => setPartyId(e.target.value)} style={{ flex: 1 }} />
                            <Button value="Join" variant="contained" onClick={onPartyJoin}>
                                Join
                            </Button>
                        </div>
                    </Paper>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    <Card>
                        <Image
                            alt="Random image"
                            src="/music.jpg"
                            width={640}
                            height={480}
                            style={{
                                maxWidth: '100%',
                                height: '200px',
                                objectFit: 'cover'
                            }}
                        />
                        <CardContent>Get the App on the PlayStore (WIP)</CardContent>
                    </Card>
                </Container>
            </Box>
        </main>
    )
}
