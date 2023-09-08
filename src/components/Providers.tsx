'use client'
import { ThemeProvider, createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

export default function Providers({ children }: Props) {
    return (
        <ThemeProvider theme={darkTheme}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <GoogleOAuthProvider clientId="366589988548-5bkqce6grv7ng5kuom4apq7v43ashc4i.apps.googleusercontent.com">{children}</GoogleOAuthProvider>
        </ThemeProvider>
    )
}
