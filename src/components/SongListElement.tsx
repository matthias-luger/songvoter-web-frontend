import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { CoflnetSongVoterModelsSong } from '../../generated'
import React from 'react'
import Image from 'next/image'

interface Props {
    song: CoflnetSongVoterModelsSong
    clickElement: JSX.Element | null
    isPlaying?: boolean
    playButtonElement?: JSX.Element
}

export default function SongListElement(props: Props) {
    return (
        <>
            <ListItem style={props.isPlaying ? { backgroundColor: '#444444', borderRadius: 10 } : {}}>
                <ListItemButton>
                    <ListItemAvatar>
                        <Image width={64} height={64} alt="" style={{ marginRight: 5 }} src={props.song.occurences![0].thumbnail as string} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<p style={props.isPlaying ? { color: 'lime' } : {}}>{props.song.title}</p>}
                        secondary={
                            <React.Fragment>
                                <p>{props.song.occurences![0].artist}</p>
                                <p>{props.song.occurences![0].platform}</p>
                            </React.Fragment>
                        }
                    />
                    {props.clickElement}
                </ListItemButton>
            </ListItem>
        </>
    )
}
