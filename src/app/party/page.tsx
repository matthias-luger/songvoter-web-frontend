'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getPartyController } from '@/utils/ApiUtils'
import { CoflnetSongVoterModelsParty } from '../../../generated'
import Header from '@/components/Header'
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material'
import Footer from '@/components/Footer'

let songs = ['Song1', 'Song2', 'Song3']

export default function Page() {
    let [party, setParty] = useState<CoflnetSongVoterModelsParty>()
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadParty()
    }, [])

    async function loadParty() {
        let partyController = await getPartyController()
        let party = await partyController.partyGet()
        setParty(party)
        setIsLoading(false)
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
                            Party Overview
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
                    <Container sx={{ py: 8 }} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {songs.map(song => (
                                <Grid item key={song} xs={12} sm={6} md={4}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%'
                                            }}
                                            image="https://source.unsplash.com/random?wallpapers"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {song}
                                            </Typography>
                                            <Typography>This is a media card. You can use this section to describe the content.</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View</Button>
                                            <Button size="small">Edit</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </main>
        </>
    )
}
