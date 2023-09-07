import { getAuthController } from '@/utils/ApiUtils'
import { Button } from '@mui/material'
import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
export default function GoogleLogin() {
    const login = useGoogleLogin({
        onSuccess: handleGoogleSuccessResponse,
        flow: 'auth-code',
        redirect_uri: 'https://songvoter.party/party'
    })

    async function handleGoogleSuccessResponse(response: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) {
        console.log(response)
    }

    return <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
}
