import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import { addNewFilesLocal, removeFile } from 'utils/clientFunctions';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

const SingleFileUpload = ({ error, file, setFieldValue, sx, images, setImages, name }) => {
  const theme = useTheme();

  console.log('images', images);
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
      const response = await addNewFilesLocal(acceptedFiles[0]);
      if (response.success) {
        setImages({ name: response.name, url: response.url });
      }
    }
  });

  const thumbs = images && images.url && (
    <img
      key={images.name}
      alt={images.name}
      src={`${process.env.REACT_APP_API_URL}${images.url}`} // Use backend URL for the image source
      style={{
        top: 8,
        left: 8,
        borderRadius: 2,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
        background: theme.palette.background.paper
      }}
    />
  );

  const onRemove = async () => {
    await removeFile(images.name);
    setImages(null);
    setFieldValue(name, null); // Clear the field value in Formik
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && {
            padding: '12% 0'
          })
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
        {thumbs}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {file && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Remove
          </Button>
        </Stack>
      )}
    </Box>
  );
};

SingleFileUpload.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.array, // Change to object to match the file
  setFieldValue: PropTypes.func.isRequired,
  sx: PropTypes.object,
  setImages: PropTypes.func.isRequired,
  images: PropTypes.object,
  name: PropTypes.string.isRequired // Added name prop
};

export default SingleFileUpload;
