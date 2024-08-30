import { Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { getData, postData } from 'utils/clientFunctions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  designation: yup.string().required('Designation is required'),
  profileImage: yup.mixed().required('Profile image is required')
});

function AddTeams() {
  const [teamData, setTeamData] = useState({});
  const [image, setImage] = useState(null);
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: teamData.name || '',
      designation: teamData.designation || '',
      description: teamData.description || '',
      profileImage: image
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          profileImage: image,
          id: teamData.id
        };
        console.log(payload);
        const response = await postData(`${process.env.REACT_APP_API_URL}/teams`, payload);
        if (response.success) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Team details added successfully.',
              variant: 'alert',
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
              message: 'Failed to add team details. Please try again.',
              variant: 'alert',
              alert: {
                color: 'error'
              },
              close: false
            })
          );
        }
      } catch (error) {
        console.error('Error updating team details:', error);
      }
    }
  });

  const handleProfileImageChange = (images) => {
    setImage(images);
    formik.setFieldValue('profileImage', images);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/teams/${id}`);
        if (newData.success) {
          setTeamData(newData.data);
          setImage(newData.data.profileImage);
        } else {
          setTeamData({});
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
          <MainCard title="Update Team Member">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} lg={6}>
                <Stack spacing={1}>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth
                    placeholder="Enter full name"
                  />
                </Stack>
                <FormHelperText>Please enter full name</FormHelperText>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Stack spacing={1}>
                  <InputLabel>Designation</InputLabel>
                  <TextField
                    id="designation"
                    name="designation"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation}
                    fullWidth
                    placeholder="Enter Designation"
                  />
                </Stack>
                <FormHelperText>Please enter Designation</FormHelperText>
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
                    rows={2}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Profile Image</InputLabel>
                  <SingleFileUpload
                    id="profileImage"
                    name="profileImage"
                    images={image}
                    setFieldValue={formik.setFieldValue}
                    setImages={handleProfileImageChange}
                    file={image}
                    error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
                    helperText={formik.touched.profileImage && formik.errors.profileImage}
                  />
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
        </Grid>
      </Grid>
    </form>
  );
}

export default AddTeams;
