import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Cropper from 'react-easy-crop';
import { Modal, Text, Group, Button, Divider, Slider, Box, LoadingOverlay } from '@mantine/core';
import getCroppedImg from '../../../utils/cropImage';
import { uploadImageProfile } from '../../../services/file';

interface IProps {
  opened: boolean
  close: VoidFunction
	image: string | null
	user_id: string
	setCroppedImage: Function
	access_token: string | null
}

const EditImageProfileModal: React.FC<IProps> = (props) =>{
	const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<number | null>(null);
	const [loading, setLoading] = useDisclosure(false);
	const [errorText, setErrorText] = useState<string | null>(null);

	const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }

	const showCroppedImage = async () => {
    try {
			if (props.image !== null) {
				const croppedImage: any = await getCroppedImg(
					props.image,
					croppedAreaPixels,
					rotation
				);
				props.setCroppedImage(croppedImage);
				return { croppedImage };
			} else {
				console.error('NULL Image');
			}
    } catch (e) {
      console.error(e)
    }
  }

  // const onClose = () => {
  //   props.setCroppedImage(null)
  // }

	const uploadImageHandler = async () => {
		let croppedResult: any = await showCroppedImage();
		// console.log('donee: ', croppedResult.croppedImage);
		setLoading.toggle();

		try {
			let result = await uploadImageProfile(croppedResult.croppedImage, props.user_id, props.access_token);
			setLoading.close()

			if (result.message !== "success"){
				setErrorText(result.message);
			} else {
				props.close();	
			}
		} catch (err) {
			console.log(err);
		}
	}

  return (
		<Modal opened={props.opened} onClose={props.close} withCloseButton={false} size='lg'>
			<LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
			<div style={{
				position: 'relative',
				width: '100%',
				height: 240,
				background: '#333',
			}}>
				<Cropper
					image={props.image !== null ? props.image: undefined}
					crop={crop}
					rotation={rotation}
					zoom={zoom}
          cropShape="round"
          showGrid={false}
					aspect={1}
					onCropChange={setCrop}
					onRotationChange={setRotation}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<Box maw={360} mx="auto" p={24}>
				<Text>Zoom</Text>
				<Slider
					defaultValue={1}
					min={1}
					max={3}
					label={(value) => value.toFixed(1)}
					step={0.1}
					styles={{ markLabel: { display: 'none' } }}
					onChange={setZoom}
				/>
				<Text mt={16}>Rotation</Text>
				<Slider
					defaultValue={0}
					min={0}
					max={360}
					label={(value) => value.toFixed(1)}
					step={1}
					styles={{ markLabel: { display: 'none' } }}
					onChange={setRotation}
				/>
			</Box>
			{/* <p>{props.user_id}</p> */}
			<Divider pb={16}/>
			{errorText !== null ? 
			<Group justify="center" p={12} gap={"xs"}>
				<Text c="red" fz="sm" ta="center">{errorText}</Text>
			</Group>
			: <></>}
			<Group justify="space-between">
				<Button onClick={() => uploadImageHandler()}>Confirm</Button>
				<Button variant="default" onClick={props.close}>Cancel</Button>
			</Group>
    </Modal>
	)
}

export default EditImageProfileModal;