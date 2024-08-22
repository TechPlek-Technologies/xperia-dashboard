// material-ui
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, FormHelperText, Grid, InputLabel, Stack, TextField, Select, MenuItem } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import Editor from 'sections/Blog/Add-Blog';
import { postData } from 'utils/clientFunctions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ==============================|| VALIDATION SCHEMA ||============================== //
const validationSchema = yup.object({
  blogTitle: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  bannerImage: yup.mixed().required('Banner image is required'),
  category: yup.string().required('Category is required'),
  slug: yup.string().required('Slug is required')
});

// ==============================|| NEW BLOG PAGE ||============================== //
const NewBlog = ({ title }) => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      blogTitle: '',
      description: '',
      bannerImage: null,
      category: '',
      slug: '',
      mainContent: value
    },
    validationSchema,
    onSubmit: async (values) => {
      // Include the image data with form values
      const blogData = {
        blogTitle: values.blogTitle,
        description: values.description,
        bannerImage: image,
        slug: values.slug,
        category: values.slug,
        mainContent: value
      };

      // Debug logging
      console.log(blogData);

      // Post the data to the API
      const response = await postData(`${process.env.REACT_APP_API_URL}/blogs`, blogData);
      console.log(response);
      if (response.success) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Blog added successfully.',
            variant: 'alert',
            // anchorOrigin: {
            //   vertical: 'top',
            //   horizontal: 'right'
            // },
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      }
    }
  });

  const handleBannerImageChange = (image) => {
    setImage(image);
    formik.setFieldValue('bannerImage', image);
  };

  return (
    <MainCard title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Slug</InputLabel>
              <TextField
                id="slug"
                name="slug"
                value={formik.values.slug}
                onChange={formik.handleChange}
                placeholder="Slug"
                error={formik.touched.slug && Boolean(formik.errors.slug)}
                helperText={formik.touched.slug && formik.errors.slug}
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel id="span">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category || ''}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                // helperText={formik.touched.span && formik.errors.span}
                fullWidth
                placeholder="Category"
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Category 1'}>Category 1</MenuItem>
                <MenuItem value={'Category 2'}>Category 2</MenuItem>
                <MenuItem value={'Category 3'}>Category 3</MenuItem>
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Short Description</InputLabel>
              <TextField
                id="description"
                name="description"
                placeholder="Short Description *"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                fullWidth
                multiline
                rows={2}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Editor subtitle={'Main Content'} value={value} setValue={setValue} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Add Banner Image</InputLabel>
            <Stack spacing={1.5}>
              <SingleFileUpload
                id={'bannerImage'}
                name={'bannerImage'}
                images={image}
                setFieldValue={formik.setFieldValue}
                setImages={handleBannerImageChange}
                file={formik.values.bannerImage}
                error={formik.touched.bannerImage && Boolean(formik.errors.bannerImage)}
                helperText={formik.touched.bannerImage && formik.errors.bannerImage}
              />
            </Stack>
            <FormHelperText>{formik.touched.bannerImage && formik.errors.bannerImage}</FormHelperText>
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
      </form>
    </MainCard>
  );
};

NewBlog.propTypes = {
  title: PropTypes.string
};

export default NewBlog;
