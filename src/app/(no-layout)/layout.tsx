import { CssBaseline, ThemeProvider } from '@mui/material'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import Header from '@/components/Header'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SongVoter',
    description: 'Vote for your favorite songs'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <CssBaseline />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
