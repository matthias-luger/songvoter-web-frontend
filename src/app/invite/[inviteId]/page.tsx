'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getPartyController } from '@/utils/ApiUtils'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import { getLoadingElement } from '@/utils/LoadingUtils'

export default function Page({ params }: any) {
    let router = useRouter()

    useEffect(() => {
        joinParty()
    }, [])

    async function joinParty() {
        console.log(params)
        let partyController = await getPartyController()
        await partyController.partyInviteIdJoinPost({
            inviteId: params.inviteId
        })
        router.push('/party')
    }

    return (
        <>
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
                            Joining party...
                        </Typography>
                        {getLoadingElement(<></>)}
                    </Container>
                </Box>
            </main>
        </>
    )
}
