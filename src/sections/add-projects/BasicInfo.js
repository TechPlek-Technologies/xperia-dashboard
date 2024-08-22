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
  shortDescription: yup.string().required('Short Description is required'),
  title: yup.string().required('Title is required'),
  longDescription: yup.string().required('Long Description is required'),
  banner: yup.mixed().required('Banner Image is required'),
  carousel1: yup.mixed().required('Carousel Images are required'),
  carousel2: yup.mixed().required('Carousel Images are required'),
  carousel3: yup.mixed().required('Carousel Images are required')
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
  const [banner, setBanner] = useState(basicInfo.banner || null);
  const [iconImage, setIconImage] = useState(basicInfo.banner || null);
  const [carousel1, setCarousel1] = useState(basicInfo.carousel1 || null);
  const [carousel2, setCarousel2] = useState(basicInfo.carousel2 || null);
  const [carousel3, setCarousel3] = useState(basicInfo.carousel3 || null);

  const formik = useFormik({
    initialValues: {
      title: basicInfo.title || '',
      shortDescription: basicInfo.shortDescription || '',
      longDescription: basicInfo.longDescription || '',
      banner: basicInfo.banner || null,
      carousel1: basicInfo.carousel1 || null,
      carousel2: basicInfo.carousel2 || null,
      carousel3: basicInfo.carousel3 || null,
      files: []
    },
    validationSchema,
    onSubmit: (values) => {
      setBasicInfo({
        title: values.title || null,
        shortDescription: values.shortDescription || null,
        longDescription: values.longDescription || null,
        banner: banner || null,
        carousel1: carousel1 || null,
        carousel2: carousel2 || null,
        carousel3: carousel3 || null
      });
      handleNext();
    }
  });

  const handleBannerImageChange = (name, images) => {
    formik.setFieldValue(name, images);

    // Update the corresponding state based on the name
    switch (name) {
      case 'iconImage':
        setIconImage(images);
        break;
      case 'banner':
        setBanner(images);
        break;
      case 'carousel1':
        setCarousel1(images);
        break;
      case 'carousel2':
        setCarousel2(images);
        break;
      case 'carousel3':
        setCarousel3(images);
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
        Primary Information
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title</InputLabel>
              <TextField
                id="title"
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
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
                placeholder="Short Description"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                helperText={formik.touched.shortDescription && formik.errors.shortDescription}
                fullWidth
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
                rows={2}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Project Overview</InputLabel>
              <TextField
                id="projectOverview"
                name="projectOverview"
                placeholder="Project Overview"
                value={formik.values.projectOverview}
                onChange={formik.handleChange}
                error={formik.touched.projectOverview && Boolean(formik.errors.projectOverview)}
                helperText={formik.touched.projectOverview && formik.errors.projectOverview}
                fullWidth
                multiline
                rows={2}
              />
            </Stack>
          </Grid>

          {/* Banner Upload Sections */}
          <BannerUploadSection
            id="iconImage"
            name="iconImage"
            label="Icon Image 1259x724"
            images={iconImage}
            handleBannerImageChange={(images) => handleBannerImageChange('iconImage', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="banner"
            name="banner"
            label="Banner Image 1259x724"
            images={banner}
            handleBannerImageChange={(images) => handleBannerImageChange('banner', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="carousel1"
            name="carousel1"
            label="Banner Image -Dimension 1024x589"
            images={carousel1}
            handleBannerImageChange={(images) => handleBannerImageChange('carousel1', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="carousel2"
            name="carousel2"
            label="Banner Dimension 768x442"
            images={carousel2}
            handleBannerImageChange={(images) => handleBannerImageChange('carousel2', images)}
            formik={formik}
          />
          <BannerUploadSection
            id="carousel3"
            name="carousel3"
            label="Banner Dimension 300x173"
            images={carousel3}
            handleBannerImageChange={(images) => handleBannerImageChange('carousel3', images)}
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
