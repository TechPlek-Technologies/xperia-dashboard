import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, InputLabel, Stack, Typography, TextField } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { useState } from 'react';

const validationSchema = yup.object({
  projectTitle: yup.string().required('Project Title is required'),
  shortDescription: yup.string().required('Short Description is required'),
  bannerImages: yup.mixed().required('Banner image is required')
});

// ==============================|| VALIDATION WIZARD - ADDRESS  ||============================== //

const BasicInfo = ({ basicInfo, setBasicInfo, handleNext, setErrorIndex }) => {
  const [bannerImages, setBannerImages] = useState(basicInfo.bannerImages || null);

  const formik = useFormik({
    initialValues: {
      projectTitle: basicInfo.projectTitle || '',
      shortDescription: basicInfo.shortDescription || '',
      longDescription: basicInfo.longDescription || '',
      bannerImages: basicInfo.bannerImages || null,
      files: []
    },
    validationSchema,
    onSubmit: (values) => {
      // Update the basicInfo state with all form values including bannerImages
      setBasicInfo({
        projectTitle: values.projectTitle,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        bannerImages: bannerImages // use the updated bannerImages from state
      });
      handleNext();
    }
  });

  // Handle changes to bannerImages and update formik as well as basicInfo
  const handleBannerImageChange = (images) => {
    setBannerImages(images);
    formik.setFieldValue('bannerImages', images); // Ensure formik's state is updated
    setBasicInfo((prevInfo) => ({
      ...prevInfo,
      bannerImages: images
    }));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Basic Details
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Project Title</InputLabel>
              <TextField
                id="projectTitle"
                name="projectTitle"
                value={formik.values.projectTitle}
                onChange={formik.handleChange}
                placeholder="Project Title"
                error={formik.touched.projectTitle && Boolean(formik.errors.projectTitle)}
                helperText={formik.touched.projectTitle && formik.errors.projectTitle}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Short Description</InputLabel>
              <TextField
                id="shortDescription"
                name="shortDescription"
                placeholder="Company Overview *"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                helperText={formik.touched.shortDescription && formik.errors.shortDescription}
                fullWidth
                multiline
                rows={2}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Long Description</InputLabel>
              <TextField
                id="longDescription"
                name="longDescription"
                placeholder="Long Description"
                value={formik.values.longDescription}
                onChange={formik.handleChange}
                error={formik.touched.longDescription && Boolean(formik.errors.longDescription)}
                helperText={formik.touched.longDescription && formik.errors.longDescription}
                fullWidth
                multiline
                rows={4}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.5} alignItems="center">
              <SingleFileUpload
                id="bannerImages"
                name="bannerImages"
                images={bannerImages}
                setFieldValue={formik.setFieldValue}
                setImages={handleBannerImageChange}
                file={formik.values.files}
                error={formik.touched.bannerImages && Boolean(formik.errors.bannerImages)}
                helperText={formik.touched.bannerImages && formik.errors.bannerImages}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

BasicInfo.propTypes = {
  basicInfo: PropTypes.object,
  setBasicInfo: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};

export default BasicInfo;
