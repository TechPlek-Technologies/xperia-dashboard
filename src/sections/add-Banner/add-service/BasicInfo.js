import PropTypes from 'prop-types';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { useState } from 'react';

const validationSchema = yup.object({
  title: yup.string().required('Banner Text is required'),
  main1259x724: yup.mixed().required('All Banner Images are required'),
  sub1024x589: yup.mixed().required('All Banner Images are required'),
  sub768x442: yup.mixed().required('All Banner Images are required'),
  sub300x173: yup.mixed().required('All Banner Images are required')
});

const BannerUploadSection = ({ id, name, label, images, handleBannerImageChange, formik }) => (
  <Grid item xs={12}>
    <InputLabel>{label}</InputLabel>
    <Stack spacing={1.5}>
      <SingleFileUpload
        id={id}
        name={name}
        images={images}
        setFieldValue={formik.setFieldValue}
        setImages={handleBannerImageChange}
        file={formik.values.files}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </Stack>
    <FormHelperText>{'Image is required'}</FormHelperText>
  </Grid>
);

BannerUploadSection.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  images: PropTypes.object,
  handleBannerImageChange: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired
};

const BasicInfo = ({ basicInfo, setBasicInfo, handleNext, setErrorIndex }) => {
  const [main1259x724, setMain1259x724] = useState(basicInfo.main1259x724 || null);
  const [sub1024x589, setSub1024x589] = useState(basicInfo.sub1024x589 || null);
  const [sub768x442, setSub768x442] = useState(basicInfo.sub768x442 || null);
  const [sub300x173, setSub300x173] = useState(basicInfo.sub300x173 || null);

  const formik = useFormik({
    initialValues: {
      title: basicInfo.title || '',
      main1259x724: basicInfo.main1259x724 || null,
      sub1024x589: basicInfo.sub1024x589 || null,
      sub768x442: basicInfo.sub768x442 || null,
      sub300x173: basicInfo.sub300x173 || null,
      files: []
    },
    validationSchema,
    onSubmit: (values) => {
      setBasicInfo({
        title: values.title || null,
        main1259x724: main1259x724 || null,
        sub1024x589: sub1024x589 || null,
        sub768x442: sub768x442 || null,
        sub300x173: sub300x173 || null
      });
      handleNext();
    }
  });

  const handleBannerImageChange = (name, images) => {
    formik.setFieldValue(name, images);

    // Update the corresponding state based on the name
    switch (name) {
      case 'main1259x724':
        setMain1259x724(images);
        break;
      case 'sub1024x589':
        setSub1024x589(images);
        break;
      case 'sub768x442':
        setSub768x442(images);
        break;
      case 'sub300x173':
        setSub300x173(images);
        break;
      default:
        break;
    }

    // Update the basicInfo object in the parent state
    setBasicInfo((prevInfo) => ({
      ...prevInfo,
      [name]: images
    }));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Primary Banner Image
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Banner Text</InputLabel>
              <TextField
                id="title"
                name="title"
                placeholder="Add Banner Text"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
              />
            </Stack>
          </Grid>

          {/* Banner Upload Sections */}
          <BannerUploadSection
            id="main1259x724"
            name="main1259x724"
            label="Banner Dimension 1259x724"
            images={main1259x724}
            handleBannerImageChange={(images) => handleBannerImageChange('main1259x724', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="sub1024x589"
            name="sub1024x589"
            label="Banner Dimension 1024x589"
            images={sub1024x589}
            handleBannerImageChange={(images) => handleBannerImageChange('sub1024x589', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="sub768x442"
            name="sub768x442"
            label="Banner Dimension 768x442"
            images={sub768x442}
            handleBannerImageChange={(images) => handleBannerImageChange('sub768x442', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="sub300x173"
            name="sub300x173"
            label="Banner Dimension 300x173"
            images={sub300x173}
            handleBannerImageChange={(images) => handleBannerImageChange('sub300x173', images)}
            formik={formik}
          />

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
