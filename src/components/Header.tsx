import MusicIcon from '@mui/icons-material/MusicNote'
import { AppBar, Toolbar, Typography } from '@mui/material'

export default function Header() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <MusicIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    SongVoter
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
