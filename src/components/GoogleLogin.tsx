import { GOOGLE_TOKEN, getAuthController } from '@/utils/ApiUtils'
import { Button } from '@mui/material'
import { CodeResponse, useGoogleLogin } from '@react-oauth/google'

interface Props {
    onAfterLogin(token: string): void
}

export default function GoogleLogin(props: Props) {
    const login = useGoogleLogin({
        onSuccess: handleGoogleSuccessResponse,
        flow: 'auth-code'
    })

    async function handleGoogleSuccessResponse(response: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) {
        let authController = await getAuthController()
        let token = await authController.apiAuthGoogleCodePost({
            coflnetSongVoterControllersAuthApiControllerImplAuthCode: {
                code: response.code,
                redirectUri: 'postmessage'
            }
        })
        localStorage.setItem(GOOGLE_TOKEN, token.token!)
        props.onAfterLogin(token.token!)
    }

    return <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
}
