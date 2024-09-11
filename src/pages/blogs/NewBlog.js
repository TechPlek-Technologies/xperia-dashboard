import PropTypes from 'prop-types';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import { Button, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import Editor from 'sections/Blog/Add-Blog';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postData } from 'utils/clientFunctions';

// Define the validation schema with uncommented rules
const validationSchema = yup.object({
  blogTitle: yup.string().required('Blog Title is required'),
  shortDescription: yup.string().required('Short Description is required'),
  bannerImage: yup.mixed().required('Banner image is required'),
  iconImage: yup.mixed().required('Icon image is required')
});

const NewBlog = ({ title }) => {
  const [value, setValue] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);

  const createSlug = (title) => {
    let slug = title.toLowerCase();
    slug = slug.replace(/[^a-z0-9\s-]/g, '');
    slug = slug.replace(/\s+/g, '-');
    slug = slug.replace(/-+/g, '-');
    slug = slug.trim();
    return slug;
  };

  const handleBannerImageChange = (images) => {
    setBannerImage(images);
    formik.setFieldValue('bannerImage', images);
  };

  const handleIconImageChange = (images) => {
    setIconImage(images);
    formik.setFieldValue('iconImage', images);
  };

  const formik = useFormik({
    initialValues: {
      blogTitle: '',
      shortDescription: '',
      bannerImage: '',
      iconImage: null,
      mainContent: null,
      category: '',
      files: []
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        blogTitle: values.blogTitle,
        description: values.shortDescription,
        category: values.category,
        bannerImage,
        iconImage,
        mainContent: value,
        slug: createSlug(values.blogTitle)
      };

      try {
        const response = await postData(`${process.env.REACT_APP_API_URL}/blogs`, data);
        console.log(response);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} id="validation-forms">
      <MainCard title={title}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1}>
              <InputLabel>Blog Title</InputLabel>
              <TextField
                id="blogTitle"
                name="blogTitle"
                value={formik.values.blogTitle}
                onChange={formik.handleChange}
                placeholder="Blog Title"
                error={formik.touched.blogTitle && Boolean(formik.errors.blogTitle)}
                helperText={formik.touched.blogTitle && formik.errors.blogTitle}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                fullWidth
                placeholder="Award type"
              >
                <MenuItem value={'Creative'}>Creative</MenuItem>
                <MenuItem value={'Social'}>Social</MenuItem>
                <MenuItem value={'trending'}>Trending</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Short Description</InputLabel>
              <TextField
                id="shortDescription"
                name="shortDescription"
                placeholder="Short Description *"
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
            <InputLabel>Add Icon Image (939x569)</InputLabel>
            <Stack spacing={1.0}>
              <SingleFileUpload
                id="iconImage"
                name="iconImage"
                images={iconImage}
                setFieldValue={formik.setFieldValue}
                setImages={handleIconImageChange}
                file={formik.values.files}
                error={formik.touched.iconImage && Boolean(formik.errors.iconImage)}
                helperText={formik.touched.iconImage && formik.errors.iconImage}
              />
            </Stack>
            {formik.touched.iconImage && formik.errors.iconImage && <FormHelperText error>{formik.errors.iconImage}</FormHelperText>}
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Add Banner Image (939x569)</InputLabel>
            <Stack spacing={1.0}>
              <SingleFileUpload
                id="bannerImage"
                name="bannerImage"
                images={bannerImage}
                setFieldValue={formik.setFieldValue}
                setImages={handleBannerImageChange}
                file={formik.values.files}
                error={formik.touched.bannerImage && Boolean(formik.errors.bannerImage)}
                helperText={formik.touched.bannerImage && formik.errors.bannerImage}
              />
            </Stack>
            {formik.touched.bannerImage && formik.errors.bannerImage && <FormHelperText error>{formik.errors.bannerImage}</FormHelperText>}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Editor subtitle={'Main Content'} value={value} setValue={setValue} />
            </Stack>
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
    </form>
  );
};

NewBlog.propTypes = {
  title: PropTypes.string
};

export default NewBlog;
