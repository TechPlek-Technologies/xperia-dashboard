// material-ui
import { Button, Grid, InputLabel, Stack, TextField, FormHelperText, Select, MenuItem } from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';
// project-imports
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { getData, postData } from 'utils/clientFunctions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useParams } from 'react-router';

// assets

// ==============================|| LAYOUTS -  COLUMNS ||============================== //
const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  year: yup.string().required('Year is required'),
  description: yup.string().required('Description is required'),
  awardImage: yup.mixed().required('Award image is required'),
  span: yup.string().required('Category is required')
});

function AddAward() {
  const [awardData, setAwardData] = useState({});
  const [image, setImage] = useState(null);
  const { id } = useParams();
  console.log('awardData', awardData);

  const formik = useFormik({
    initialValues: {
      title: awardData.title || '',
      year: awardData.designation || '',
      description: awardData.description || '',
      span: awardData.category || '',
      awardImage: image
      // files: []
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      // Update the basicInfo state with all form values including bannerImages
      const payload = {
        id: awardData.id,
        title: values.title,
        year: values.year,
        description: values.description,
        category: values.span,
        awardImage: image
      };

      console.log(awardData);
      const response = await postData(`${process.env.REACT_APP_API_URL}/awards`, payload);
      console.log(response);
      if (response.success) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Award added successfully.',
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
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Failed to add award. Please try again.',
            variant: 'alert',
            // anchorOrigin: {
            //   vertical: 'top',
            //   horizontal: 'right'
            // },
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }
    }
  });

  const handleawardImageChange = (images) => {
    setImage(images);
    formik.setFieldValue('awardImage', images); // Ensure formik's state is updated
    setAwardData((prevInfo) => ({
      ...prevInfo,
      awardImage: images
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/awards/${id}`);

        if (newData.success) {
          console.log('newData.data', newData.data);
          setAwardData({
            id: newData.data.id,
            title: newData.data.title,
            description: newData.data.description,
            designation: newData.data.year,
            category: newData.data.category
          });
          setImage(newData.data.awardImage);
        } else {
          setAwardData({
            id: ' ',
            title: ' ',
            description: ' ',
            designation: ' ',
            category: ''
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="Add New Award">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} lg={6}>
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
              <Grid item xs={12} lg={6}>
                <Stack spacing={1}>
                  <InputLabel>Year</InputLabel>
                  <TextField
                    id="year"
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                    fullWidth
                    placeholder="Enter Year"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Stack spacing={1}>
                  <InputLabel id="span">Award Type</InputLabel>
                  <Select
                    labelId="span"
                    id="span"
                    name="span"
                    value={formik.values.span}
                    // defaultValue={formik.values.span}
                    onChange={formik.handleChange}
                    error={formik.touched.span && Boolean(formik.errors.span)}
                    // helperText={formik.touched.span && formik.errors.span}
                    fullWidth
                    placeholder="Award type"
                  >
                    <MenuItem value={'GOLD'}>Gold</MenuItem>
                    <MenuItem value={'SILVER'}>Silver</MenuItem>
                    <MenuItem value={'BRONZE'}>Bronze</MenuItem>
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12} lg={6}>
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
                    rows={1}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Award Image 750x953</InputLabel>
                  <SingleFileUpload
                    id="awardImage"
                    name="awardImage"
                    images={image}
                    setFieldValue={formik.setFieldValue}
                    setImages={handleawardImageChange}
                    file={image}
                    error={formik.touched.awardImage && Boolean(formik.errors.awardImage)}
                    helperText={formik.touched.awardImage && formik.errors.awardImage}
                  />
                </Stack>
                <FormHelperText>{'Award image is required'}</FormHelperText>
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

export default AddAward;
