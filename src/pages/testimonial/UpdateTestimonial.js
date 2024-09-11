import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { postData, getData } from 'utils/clientFunctions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useParams } from 'react-router';

// ==============================|| VALIDATION SCHEMA ||============================== //
const validationSchema = yup.object({
  // clientName: yup.string().required('Name is required'),
  // shortDescription: yup.string().required('Short Description is required'),
  // designation: yup.string().required('Designation is required'),
  // iconImage: yup.mixed().required('Icon image is required')
});

// ==============================|| NEW BLOG PAGE ||============================== //
const UpdateTestimonial = ({ title }) => {
  const [iconImage, setIconImage] = useState(null);
  const { id } = useParams();

  const handleIconImageChange = (images) => {
    setIconImage(images);
    formik.setFieldValue('iconImage', images);
  };

  const formik = useFormik({
    initialValues: {
      clientName: '',
      designation: '',
      shortDescription: '',
      files: []
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        id: id,
        name: values.clientName,
        designation: values.designation,
        shortDescription: values.shortDescription,
        iconImage
      };

      try {
        const response = await postData(`${process.env.REACT_APP_API_URL}/testimonials`, data);
        console.log(response);
        if (response.success) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Testimonial Updated successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/testimonials/${id}`);
        if (newData.success) {
          // Set initial values with API data
          formik.setValues({
            clientName: newData.data.name,
            designation: newData.data.designation,
            shortDescription: newData.data.shortDescription
          });
          setIconImage(newData.data.iconImage || null);
        } else {
          formik.setValues({
            clientName: '',
            designation: '',
            shortDescription: ''
          });

          setImage(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <form onSubmit={formik.handleSubmit} id="validation-forms">
      <MainCard title={title}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1}>
              <InputLabel>Name</InputLabel>
              <TextField
                id="clientName"
                name="clientName"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                placeholder="Name"
                error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                helperText={formik.touched.clientName && formik.errors.clientName}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1}>
              <InputLabel>Designation</InputLabel>
              <TextField
                id="designation"
                name="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                placeholder="Designation"
                error={formik.touched.designation && Boolean(formik.errors.designation)}
                helperText={formik.touched.designation && formik.errors.designation}
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
            <InputLabel>Add Icon Image (100x100)</InputLabel>
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

UpdateTestimonial.propTypes = {
  title: PropTypes.string
};

export default UpdateTestimonial;
