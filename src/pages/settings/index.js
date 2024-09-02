// material-ui
import { Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// third-party

// project-imports
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getData, postData } from 'utils/clientFunctions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ==============================|| VALIDATION SCHEMAS ||============================== //
const imageUploadValidationSchema = Yup.object({
  navbarLogo: Yup.mixed().required('Navbar logo is required'),
  footerLogo: Yup.mixed().required('Footer logo is required'),
  favicon: Yup.mixed().required('Favicon is required'),
  sidebarLogo: Yup.mixed().required('Sidebar logo is required')
});

const contactDetailsValidationSchema = Yup.object({
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required')
});

const socialMediaValidationSchema = Yup.object({
  instagram: Yup.string().required('Instagram is required'),
  facebook: Yup.string().required('Facebook is required'),
  x: Yup.string().required('X is required'),
  youtube: Yup.string().required('Youtube is required')
});

// ==============================|| MAIN COMPONENT ||============================== //

const SettingsPage = () => {
  const [navLogoImage, setNavLogoImage] = useState(null);
  const [footerLogoImage, setFooterLogoImage] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [sidebarLogoImage, setSidebarLogoImage] = useState(null);
  const [contact, setContact] = useState({
    phoneNumber: '',
    email: '',
    address: ''
  });
  const [social, setSocial] = useState({
    instagram: '',
    facebook: '',
    x: '',
    youtube: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(`${process.env.REACT_APP_API_URL}/settings/all-settings`);

      if (response.success && response.data && response.data.length > 0) {
        const data = response.data[0];
        setNavLogoImage(data.navbarLogo);
        setFooterLogoImage(data.footerLogo);
        setFavicon(data.favicon);
        setSidebarLogoImage(data.sidebarLogo);
        setContact({
          phoneNumber: data.phoneNumber,
          email: data.email,
          address: data.address
        });
        setSocial({
          instagram: data.instagram,
          facebook: data.facebook,
          x: data.x,
          youtube: data.youtube
        });
      } else {
        console.error('Failed to fetch settings or settings are empty:', response.err || 'No data found');
      }
    };

    fetchData();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        {/* Image Uploads Form */}
        <Grid item xs={12}>
          <Formik
            initialValues={{
              navbarLogo: navLogoImage || null,
              footerLogo: footerLogoImage || null,
              favicon: favicon || null,
              sidebarLogo: sidebarLogoImage || null
            }}
            enableReinitialize={true}
            validationSchema={imageUploadValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log('Image Uploads Submitted:', values);
              const response = await postData(`${process.env.REACT_APP_API_URL}/settings/create-or-update`, values);
              console.log('response', response);
              if (response.success) {
                setSubmitting(false);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: 'Images uploaded successfully.',
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
              elsep;
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Failed to upload images. Please try again.',
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
            }}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <MainCard title="Image Uploads">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel>Navbar Logo</InputLabel>
                          <SingleFileUpload
                            id="navbarLogo"
                            name="navbarLogo"
                            images={navLogoImage}
                            setImages={setNavLogoImage}
                            setFieldValue={setFieldValue}
                            file={values.navbarLogo}
                            error={touched.navbarLogo && Boolean(errors.navbarLogo)}
                            helperText={touched.navbarLogo && errors.navbarLogo}
                          />
                          <FormHelperText>{errors.navbarLogo}</FormHelperText>
                        </Stack>
                        <Stack spacing={1}>
                          <InputLabel>Favicon</InputLabel>
                          <SingleFileUpload
                            id="favicon"
                            name="favicon"
                            images={favicon}
                            setImages={setFavicon}
                            setFieldValue={setFieldValue}
                            file={values.favicon}
                            error={touched.favicon && Boolean(errors.favicon)}
                            helperText={touched.favicon && errors.favicon}
                          />
                          <FormHelperText>{errors.favicon}</FormHelperText>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel>Footer Logo</InputLabel>
                          <SingleFileUpload
                            id="footerLogo"
                            name="footerLogo"
                            images={footerLogoImage}
                            setImages={setFooterLogoImage}
                            setFieldValue={setFieldValue}
                            file={values.footerLogo}
                            error={touched.footerLogo && Boolean(errors.footerLogo)}
                            helperText={touched.footerLogo && errors.footerLogo}
                          />
                          <FormHelperText>{errors.footerLogo}</FormHelperText>
                        </Stack>
                        <Stack spacing={1}>
                          <InputLabel>Sidebar Logo</InputLabel>
                          <SingleFileUpload
                            id="sidebarLogo"
                            name="sidebarLogo"
                            images={sidebarLogoImage}
                            setImages={setSidebarLogoImage}
                            setFieldValue={setFieldValue}
                            file={values.sidebarLogo}
                            error={touched.sidebarLogo && Boolean(errors.sidebarLogo)}
                            helperText={touched.sidebarLogo && errors.sidebarLogo}
                          />
                          <FormHelperText>{errors.sidebarLogo}</FormHelperText>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained">
                        Submit Image Uploads
                      </Button>
                    </Grid>
                  </Grid>
                </MainCard>
              </Form>
            )}
          </Formik>
        </Grid>

        {/* Contact Details Form */}
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              phoneNumber: contact.phoneNumber || '',
              email: contact.email || '',
              address: contact.address || ''
            }}
            enableReinitialize={true}
            validationSchema={contactDetailsValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log('Contact Details Submitted:', values);
              const response = await postData(`${process.env.REACT_APP_API_URL}/settings/create-or-update`, values);
              console.log('response', response);
              if (response.success) {
                setSubmitting(false);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: 'Contact details added successfully.',
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
                    message: 'Failed to add contact details. Please try again.',
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
            }}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <MainCard title="Contact Details">
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Phone Number</InputLabel>
                        <Field
                          as={TextField}
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={values.phoneNumber}
                          onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={2}>
                        <InputLabel>Email</InputLabel>
                        <Field
                          as={TextField}
                          id="email"
                          name="email"
                          placeholder="Email"
                          fullWidth
                          value={values.email}
                          onChange={(e) => setFieldValue('email', e.target.value)}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Address</InputLabel>
                        <Field
                          as={TextField}
                          id="Address"
                          name="Address"
                          placeholder="Address"
                          value={values.address}
                          onChange={(e) => setFieldValue('address', e.target.value)}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" type="submit">
                        Submit Contact Details
                      </Button>
                    </Grid>
                  </Grid>
                </MainCard>
              </Form>
            )}
          </Formik>
        </Grid>

        {/* Social Media Form */}
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              instagram: social.instagram || '',
              facebook: social.facebook || '',
              x: social.x || '',
              youtube: social.youtube || ''
            }}
            enableReinitialize={true}
            validationSchema={socialMediaValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log('Social Media Submitted:', values);
              const response = await postData(`${process.env.REACT_APP_API_URL}/settings/create-or-update`, values);
              console.log('response', response);
              if (response.success) {
                setSubmitting(false);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: 'Social media details added successfully.',
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
                    message: 'Failed to add social media details. Please try again.',
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
            }}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <MainCard title="Social Media">
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Instagram</InputLabel>
                        <Field
                          as={TextField}
                          id="instagram"
                          name="instagram"
                          placeholder="Instagram URL"
                          value={values.instagram}
                          onChange={(e) => setFieldValue('instagram', e.target.value)}
                          error={touched.instagram && Boolean(errors.instagram)}
                          helperText={touched.instagram && errors.instagram}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Facebook</InputLabel>
                        <Field
                          as={TextField}
                          id="facebook"
                          name="facebook"
                          placeholder="Facebook URL"
                          value={values.facebook}
                          onChange={(e) => setFieldValue('facebook', e.target.value)}
                          error={touched.facebook && Boolean(errors.facebook)}
                          helperText={touched.facebook && errors.facebook}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>X</InputLabel>
                        <Field
                          as={TextField}
                          id="x"
                          name="x"
                          placeholder="X URL"
                          value={values.x}
                          onChange={(e) => setFieldValue('x', e.target.value)}
                          error={touched.x && Boolean(errors.x)}
                          helperText={touched.x && errors.x}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Youtube</InputLabel>
                        <Field
                          as={TextField}
                          id="youtube"
                          name="youtube"
                          placeholder="Youtube URL"
                          value={values.youtube}
                          onChange={(e) => setFieldValue('youtube', e.target.value)}
                          error={touched.youtube && Boolean(errors.youtube)}
                          helperText={touched.youtube && errors.youtube}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained">
                        Submit Social Media
                      </Button>
                    </Grid>
                  </Grid>
                </MainCard>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SettingsPage;
