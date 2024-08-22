// material-ui
import { Button, Grid, InputLabel, Stack, TextField, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
// project-imports
import MainCard from 'components/MainCard';
import { useState } from 'react';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';

// assets

// ==============================|| LAYOUTS -  COLUMNS ||============================== //
const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  aboutImage: yup.mixed().required('Award image is required')
});

function Editor({ slug, titleText, aboutData, setAboutData, handleSubmit }) {
  const [image, setImage] = useState(aboutData.aboutImage || null);

  const formik = useFormik({
    initialValues: {
      title: aboutData.name || '',
      description: aboutData.description || '',
      aboutImage: aboutData.aboutImage || null,
      files: []
    },
    validationSchema,
    onSubmit: async (values) => {
      // Update the basicInfo state with all form values including bannerImages

      await setAboutData({
        name: values.title,
        description: values.description,
        slug: slug,
        aboutImage: image
      });

      await handleSubmit(aboutData);
    }
  });

  const handleaboutImageChange = (images) => {
    setImage(images);
    formik.setFieldValue('aboutImage', images); // Ensure formik's state is updated
    setAboutData((prevInfo) => ({
      ...prevInfo,
      aboutImage: images
    }));
  };
  return (
    <form onSubmit={formik.handleSubmit} id="validation-forms">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title={titleText}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title</InputLabel>
                  <TextField
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    fullWidth
                    placeholder="Enter Award Title"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Description</InputLabel>
                  <TextField
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Banner Image 1269x 615</InputLabel>
                  <SingleFileUpload
                    id="aboutImage"
                    name="aboutImage"
                    images={image}
                    sx={{ height: '50%' }}
                    setFieldValue={formik.setFieldValue}
                    setImages={handleaboutImageChange}
                    file={formik.values.files}
                    error={formik.touched.aboutImage && Boolean(formik.errors.aboutImage)}
                    helperText={formik.touched.aboutImage && formik.errors.aboutImage}
                  />
                </Stack>
                <FormHelperText>{'Banner image is required'}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end">
                  <AnimateButton>
                    <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit">
                      Submit
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
}

export default Editor;

Editor.propTypes = {
  aboutData: PropTypes.object,
  image: PropTypes.string,
  slug: PropTypes.string,
  titleText: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  setAboutData: PropTypes.func
};
