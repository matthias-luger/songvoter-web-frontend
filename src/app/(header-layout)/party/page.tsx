'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getPartyController } from '@/utils/ApiUtils'
import { CoflnetSongVoterModelsParty, CoflnetSongVoterModelsPartyPlaylistEntry, CoflnetSongVoterModelsSong } from '../../../../generated'
import Header from '@/components/Header'
import { Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Modal } from '@mui/material'
import LikeIconOutline from '@mui/icons-material/ThumbUpOutlined'
import LikeIcon from '@mui/icons-material/ThumbUp'
import DislikeIconOutline from '@mui/icons-material/ThumbDownOutlined'
import DislikeIcon from '@mui/icons-material/ThumbDown'
import { getLoadingElement } from '@/utils/LoadingUtils'
import AddSong from '@/components/AddSong'

export default function Page() {
    let [party, setParty] = useState<CoflnetSongVoterModelsParty>()
    let [playlist, setPlaylist] = useState<CoflnetSongVoterModelsPartyPlaylistEntry[]>([])
    let [isLoading, setIsLoading] = useState(true)
    let [showAddSongModal, setShowAddSongModal] = useState(false)

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
        let party = await partyController.apiPartyGet()
        console.log(party)
        setParty(party)
    }

    async function loadSongs() {
        let partyController = await getPartyController()
        let playlist = await partyController.apiPartyPlaylistGet()
        setPlaylist(playlist)
    }

    async function onLikeButtonPress(playlistEntry: CoflnetSongVoterModelsPartyPlaylistEntry) {
        if (playlistEntry.selfVote === 'up') {
            removeVote(playlistEntry)
            return
        }
        let controller = await getPartyController()
        await controller.apiPartyUpvoteSongIdPost({
            songId: playlistEntry.song?.id!
        })
        let newPlaylist = [...playlist]
        let entry = newPlaylist.find(e => e.song?.id === playlistEntry.song?.id)
        if (!entry) {
            console.log('Song not found')
            return
        }
        if (entry.selfVote === 'down') {
            entry.downVotes! -= 1
        }
        entry.upVotes! += 1
        entry.selfVote = 'up'
        setPlaylist(newPlaylist)
    }

    async function onDislikeButtonPress(playlistEntry: CoflnetSongVoterModelsPartyPlaylistEntry) {
        if (playlistEntry.selfVote === 'down') {
            removeVote(playlistEntry)
            return
        }
        let controller = await getPartyController()
        await controller.apiPartyDownvoteSongIdPost({
            songId: playlistEntry.song?.id!
        })
        let newPlaylist = [...playlist]
        let entry = newPlaylist.find(e => e.song?.id === playlistEntry.song?.id)
        if (!entry) {
            console.log('Song not found')
            return
        }
        if (entry.selfVote === 'up') {
            entry.upVotes! -= 1
        }
        entry.selfVote = 'down'
        entry.downVotes! += 1
        setPlaylist(newPlaylist)
    }

    async function removeVote(playlistEntry: CoflnetSongVoterModelsPartyPlaylistEntry) {
        let controller = await getPartyController()
        await controller.apiPartyRemoveVoteSongIdPost({
            songId: playlistEntry.song?.id!
        })
        let newPlaylist = [...playlist]
        let entry = newPlaylist.find(e => e.song?.id === playlistEntry.song?.id)
        if (!entry) {
            console.log('Song not found')
            return
        }
        if (entry.selfVote === 'down') {
            entry.downVotes! -= 1
        }
        if (entry.selfVote === 'up') {
            entry.upVotes! -= 1
        }
        entry.selfVote = 'none'
        setPlaylist(newPlaylist)
    }

    async function addSongToParty(song: CoflnetSongVoterModelsSong) {
        let controller = await getPartyController()
        await controller.apiPartyUpvoteSongIdPost({
            songId: song.id!
        })
        setPlaylist([])
        setIsLoading(true)
        await loadSongs()
        setIsLoading(false)
    }

    let modalStyle = {
        position: 'absolute' as 'absolute',
        top: '2%',
        left: '5%',
        right: '5%',
        bottom: '2%',
        backgroundColor: '#444444',
        border: '2px solid #000',
        borderRadius: 4,
        p: 4
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
                        <Typography component="h1" variant="h2" align="center" color="text.primary">
                            Party
                        </Typography>
                        <Divider />
                        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                style={{ borderRadius: 15 }}
                                onClick={() => {
                                    setShowAddSongModal(true)
                                }}
                            >
                                Add Song
                            </Button>
                        </Stack>
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        {isLoading ? (
                            getLoadingElement()
                        ) : (
                            <Grid container spacing={4}>
                                {playlist.map(entry => {
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
                                                <CardActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => {
                                                            onLikeButtonPress(entry)
                                                        }}
                                                    >
                                                        {entry.upVotes}

                                                        {entry.selfVote === 'up' ? <LikeIcon color="success" /> : <LikeIconOutline color="success" />}
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => {
                                                            onDislikeButtonPress(entry)
                                                        }}
                                                    >
                                                        {entry.downVotes}
                                                        {entry.selfVote === 'down' ? <DislikeIcon color="error" /> : <DislikeIconOutline color="error" />}
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                    </Container>
                </Box>
                <Modal
                    open={showAddSongModal}
                    onClose={() => {
                        setShowAddSongModal(false)
                    }}
                    sx={modalStyle}
                    aria-labelledby="Add Song"
                >
                    <div>
                        <Typography variant="h4" component="h2">
                            Add Songs
                        </Typography>
                        <AddSong onAfterSongAdded={addSongToParty} />
                    </div>
                </Modal>
            </main>
        </>
    )
}
