'use client'
import MusicIcon from '@mui/icons-material/MusicNote'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
    let router = useRouter()

    return (
        <AppBar position="relative">
            <Toolbar>
                <MusicIcon
                    sx={{ mr: 2, cursor: 'pointer' }}
                    onClick={() => {
                        router.push('/')
                    }}
                />
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    SongVoter
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
