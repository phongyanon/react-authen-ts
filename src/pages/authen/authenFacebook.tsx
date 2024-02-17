import queryString from 'query-string';
import { useEffect } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';

const stringifiedParams = queryString.stringify({
  client_id: `${import.meta.env.VITE_FACEBOOK_APP_ID}`,
  redirect_uri: 'http://localhost:3000/authen/facebook/',
  // scope: ['email', 'user_friends'].join(','), // comma seperated string
  // response_type: 'code',
  // auth_type: 'rerequest',
  // display: 'popup',
});

export const facebookAuthenUrl = `https://www.facebook.com/v19.0/dialog/oauth?${stringifiedParams}`;

export function LoadingFacebookAuthen() {
	const [loading, loadingHandler] = useDisclosure(false);
	const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		loadingHandler.toggle();
		setTimeout(() => {
			loadingHandler.close();
      console.log('params: ', setSearchParams);
			// navigate(path);
		}, 500)
	}, [])
  return (
			
    <Box>
			<LoadingOverlay
					visible={loading}
					zIndex={1000}
					overlayProps={{ radius: 'sm', blur: 2 }}
					loaderProps={{ color: 'purple', type: 'dots' }}
				/>
    </Box>
  );
}