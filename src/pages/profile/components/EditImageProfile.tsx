import { useState, useRef, useEffect  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Paper,
  Title,
  Text,
  Button,
  Container,
  Group,
  Center,
  ActionIcon,
  FileButton,
  Image,
  Indicator
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCameraPlus, IconArrowBigUp, IconPencil } from '@tabler/icons-react';
import EditImageProfileModal from './EditImageProfileModal';
import { getProfile, getProfileByUserId } from '../../../services/profile';

export function EditImageProfile() {
	const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);
  const [editImageProfileOpened, editImageProfileHandlers] = useDisclosure(false);
  const [fileWarning, setFileWarning] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState(null);
	const [currentUID, setCurrentUID] = useState<string>('');
	const [currentToken, setCurrentToken] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
	const { profile_id } = useParams();
  const { user_id } = useParams();

	useEffect(() => {
		if (profile_id) {
			getProfile(profile_id).then((res: any) => {
				if (res.image_profile) setCroppedImage(res.image_profile)
				if (res.user_id) setCurrentUID(res.user_id);
			})
		} 
    else if (user_id) {
      getProfileByUserId(user_id).then((res: any) => {
				if (res.image_profile) setCroppedImage(res.image_profile)
        setCurrentUID(user_id);
			})
    }

		const storage_access_token: string | null = localStorage.getItem('access_token');
		if (storage_access_token !== null) setCurrentToken(storage_access_token);
	}, []);

  return (
    <Container size={460} my={30}>
			<Center pb={12}><Title order={1}>Profile picture</Title></Center>
      <Text c="dimmed" fz="sm" ta="center">
        Enter file to make profile picture from any photo {"(support PNG, JPG and JPEG, file size must not more than 2 MB.)"}
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Group justify="center">
          
          <FileButton 
            resetRef={resetRef}
            onChange={(file: any) => {
              const accept_types = ["image/png", "image/jpeg", "image/jpg"];
              if (file !== null) {
                if ((file.size < (2000*1000)) && (accept_types.includes(file.type))) {
                  setFileWarning("");
                  setFile(file);
                  
                  let reader: any = new FileReader();
                  reader.onloadend = () => {
                    const base64StringUS = reader.result
                      .replace("data:", "")
                      .replace(/^.+,/, "");
                    localStorage.setItem("tempImgProfile", base64StringUS);
                    const myImage = localStorage.getItem("tempImgProfile");
                    setFileDataURL("data:image/png;base64," + myImage);
                  };
                  reader.readAsDataURL(file);

                  editImageProfileHandlers.open();
                } else {
                  setFileWarning("File size is more than 2 MB or Invalid file type.(Support PNG, JPG and JPEG)");
                  setFile(null);
                }

              } else { setFile(null); }
            }} 
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <ActionIcon
                {...props} 
                size={150} 
                variant="light" 
                radius={'50%'} 
                aria-label="Settings" 
                // onClick={()=>editImageProfileHandlers.open()}
              >
                {croppedImage === null ? 
                  <IconCameraPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  :
                  <Indicator 
                    inline 
                    size={40} 
                    offset={7} 
                    position="bottom-end" 
                    color="yellow" 
                    label={<IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                  >
                    <Image
                      radius="50%"
                      h={150}
                      src={croppedImage}
                    />
                  </Indicator>
                }
              </ActionIcon>
            )}
          </FileButton>
        </Group>
        <Group mt="lg" justify="center">
          <IconArrowBigUp size={50}/>
        </Group>
        <Group mt="sm" justify="center">
          <Text>Click the camera icon above to select image</Text>
        </Group>
        <Group justify="center">
          <Text c="dimmed">{(file?.name as string)}</Text>
        </Group>
        <Group justify="center">
          <Text c="red" size="sm">{fileWarning}</Text>
        </Group>
        <Group mt="lg" grow>
					<Button variant="outline" onClick={() => {
							navigate("/profiles")
					}}>
						Back
					</Button>
        </Group>
      </Paper>
      <EditImageProfileModal
        image={fileDataURL}
        opened={editImageProfileOpened} 
        close={editImageProfileHandlers.close} 
        user_id={currentUID}
        setCroppedImage={setCroppedImage}
				access_token={currentToken !== null ? currentToken : null}
      />
    </Container>
  );
}