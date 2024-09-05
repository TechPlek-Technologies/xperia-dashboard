import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';

// third-party
import { useDropzone } from 'react-dropzone';

// project-imports

import { DropzopType } from 'config';
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import FilesPreview from './FilesPreview';
import { addNewFilesLocal } from 'utils/clientFunctions';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

const MultiFileUpload = ({ error, showList = false, files, type, setFieldValue, sx, onUpload, setImages }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    onDrop: async (acceptedFiles) => {
      // Use forEach instead of map because you are not returning a new array
      for (const file of acceptedFiles) {
        const response = await addNewFilesLocal(file);
        if (response.success) {
          setImages((prevImages) => [...prevImages, { name: response.name, url: response.url }]);
        }
      }

      // Handle setting the field value with the updated files
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      if (files) {
        setFieldValue('files', [...files, ...updatedFiles]);
      } else {
        setFieldValue('files', updatedFiles);
      }
    }
  });

  const onRemoveAll = () => {
    setFieldValue('files', null);
    setImages([]);
  };

  const onRemove = (file) => {
    const filteredItems = files && files.filter((_file) => _file !== file);
    setFieldValue('files', filteredItems);
    setImages(filteredItems);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          ...(type === DropzopType.standard && { width: 'auto', display: 'flex' }),
          ...sx
        }}
      >
        <Stack {...(type === DropzopType.standard && { alignItems: 'center' })}>
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              ...(type === DropzopType.standard && {
                p: 0,
                m: 1,
                width: 64,
                height: 64
              }),
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: 'error.lighter'
              })
            }}
          >
            <input {...getInputProps()} />
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {type === DropzopType.standard && files && files.length > 1 && (
            <Button variant="contained" color="error" size="extraSmall" onClick={onRemoveAll}>
              Remove all
            </Button>
          )}
        </Stack>
        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {files && files.length > 0 && <FilesPreview files={files} showList={showList} onRemove={onRemove} type={type} />}
      </Box>

      {type !== DropzopType.standard && files && files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}
    </>
  );
};

MultiFileUpload.propTypes = {
  error: PropTypes.bool,
  showList: PropTypes.bool,
  files: PropTypes.array,
  setFieldValue: PropTypes.func,
  onUpload: PropTypes.func,
  sx: PropTypes.object,
  type: PropTypes.string,
  setImages: PropTypes.func.isRequired,
  images: PropTypes.object
};

export default MultiFileUpload;
