import { useEffect } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export function LoadingPage() {
	const [loading, loadingHandler] = useDisclosure(false);
	const navigate = useNavigate();
	const { target_path } = useParams();

	useEffect(() => {
		loadingHandler.toggle();
		setTimeout(() => {
			loadingHandler.close();
			if(target_path) {
				let path: string = '';
				target_path.split('+').map(obj => {
					path = path + '/' + obj 
				});
				navigate(path);
			}
		}, 500)
	}, [])
  return (
			
    <Box pos={'relative'} h={500}>
			<LoadingOverlay
					visible={loading}
					zIndex={1000}
					overlayProps={{ radius: 'sm', blur: 2 }}
					loaderProps={{ color: 'purple', type: 'bars' }}
				/>
    </Box>
  );
}