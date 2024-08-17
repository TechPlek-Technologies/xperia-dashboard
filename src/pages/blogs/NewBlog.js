// material-ui
import PropTypes from 'prop-types';
// material-ui

// project-imports
import MainCard from 'components/MainCard';
import Editor from 'sections/Editor/TextEditor';
import { useState } from 'react';
import { Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';

// ==============================|| SAMPLE PAGE ||============================== //

const NewBlog = ({ title }) => {
  const [value, setValue] = useState('');
  return (
    <MainCard title={title}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel>Blog Title</InputLabel>
            <TextField
              id="projectTitle"
              name="projectTitle"
              // value={formik.values.projectTitle}
              // onChange={formik.handleChange}
              placeholder="Blog Title"
              // error={formik.touched.projectTitle && Boolean(formik.errors.projectTitle)}
              // helperText={formik.touched.projectTitle && formik.errors.projectTitle}
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
              placeholder="Short Description *"
              // value={formik.values.shortDescription}
              // onChange={formik.handleChange}
              // error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
              // helperText={formik.touched.shortDescription && formik.errors.shortDescription}
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
          <InputLabel>{'Add Banner Image'}</InputLabel>
          <Stack spacing={1.5}>
            <SingleFileUpload
              id={'id'}
              name={'name'}
              // images={images}
              // setFieldValue={formik.setFieldValue}
              // setImages={handleBannerImageChange}
              // file={formik.values.files}
              // error={formik.touched[name] && Boolean(formik.errors[name])}
              // helperText={formik.touched[name] && formik.errors[name]}
            />
          </Stack>
          <FormHelperText>{'Image is required'}</FormHelperText>
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
  );
};

export default NewBlog;

NewBlog.propTypes = {
  title: PropTypes.string
};
