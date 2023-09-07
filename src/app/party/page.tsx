'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getListController, getPartyController } from '@/utils/ApiUtils'
import { CoflnetSongVoterModelsParty, CoflnetSongVoterModelsPartyPlaylistEntry, CoflnetSongVoterModelsPlayList } from '../../../generated'
import Header from '@/components/Header'
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton } from '@mui/material'
import LikeIcon from '@mui/icons-material/ThumbUp'
import DislikeIcon from '@mui/icons-material/ThumbDown'
import GoogleLogin from '@/components/GoogleLogin'

export default function Page() {
    let [party, setParty] = useState<CoflnetSongVoterModelsParty>()
    let [playlist, setPlaylist] = useState<CoflnetSongVoterModelsPartyPlaylistEntry[]>([])
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        await Promise.all([loadParty(), loadSongs()]).then(() => {
            setIsLoading(false)
        })
    }

    async function loadParty() {
        let partyController = await getPartyController()
        let party = await partyController.partyGet()
        setParty(party)
    }

    async function loadSongs() {
        let partyController = await getPartyController()
        let playlist = await partyController.partyPlaylistGet()
        setPlaylist(playlist)
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
                    <GoogleLogin />
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
                            {playlist.map(entry => {
                                let x = 1
                                let song = entry.song?.occurences![0]
                                if (!song) {
                                    return null
                                }
                                return (
                                    <Grid item key={entry.song?.id} xs={12} sm={6} md={4}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    // 16:9
                                                    pt: '56.25%'
                                                }}
                                                image={song.thumbnail || ''}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {song.title}
                                                </Typography>
                                                <Typography>{song.artist}</Typography>
                                                <Typography>{song.platform}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <IconButton size="small">
                                                    <LikeIcon />
                                                </IconButton>
                                                <IconButton size="small">
                                                    <DislikeIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </Box>
            </main>
        </>
    )
}
