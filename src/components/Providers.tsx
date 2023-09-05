'use client'
import { ThemeProvider, createTheme } from '@mui/material'

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

export default function Providers({ children }: Props) {
    return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}
