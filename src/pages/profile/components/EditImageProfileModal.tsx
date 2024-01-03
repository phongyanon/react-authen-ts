import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Modal, Text, Group, Button, Divider, Slider, Box } from '@mantine/core';
import getCroppedImg from '../../../utils/cropImage';

interface IProps {
  opened: boolean;
  close: VoidFunction;
	image: string | null;
	user_id: string;
	setCroppedImage: Function;
}

const EditImageProfileModal: React.FC<IProps> = (props) =>{
	const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<number | null>(null)

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
				)
				console.log('donee: ', { croppedImage })
				props.setCroppedImage(croppedImage)
			} else {
				console.error('NULL Image')
			}
    } catch (e) {
      console.error(e)
    }
  }

  // const onClose = () => {
  //   props.setCroppedImage(null)
  // }

  return (
		<Modal opened={props.opened} onClose={props.close} withCloseButton={false} size='lg'>
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
			<Group justify="space-between">
				<Button onClick={() => {
					showCroppedImage();
					props.close();
				}}>Confirm</Button>
				<Button variant="default" onClick={props.close}>Cancel</Button>
			</Group>
    </Modal>
	)
}

export default EditImageProfileModal;