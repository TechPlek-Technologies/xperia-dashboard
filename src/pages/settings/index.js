// material-ui
import { Button, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        {/* Image Uploads Form */}
        <Grid item xs={12}>
          <Formik
            initialValues={{
              navbarLogo: null,
              footerLogo: null,
              favicon: null,
              sidebarLogo: null
            }}
            validationSchema={imageUploadValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('Image Uploads Submitted:', values);
              setSubmitting(false);
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
              phoneNumber: '',
              email: '',
              address: ''
            }}
            validationSchema={contactDetailsValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('Contact Details Submitted:', values);
              setSubmitting(false);
            }}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <MainCard title="Contact Details">
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Phone Number</InputLabel>
                        <PatternFormat
                          format="+1 (###) ###-####"
                          mask="_"
                          fullWidth
                          customInput={TextField}
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
                        <PatternFormat
                          // format="(##) ####-#####"
                          // mask="_"
                          fullWidth
                          customInput={TextField}
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
              instagram: '',
              facebook: '',
              x: '',
              youtube: ''
            }}
            validationSchema={socialMediaValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('Social Media Submitted:', values);
              setSubmitting(false);
            }}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <MainCard title="Social Media">
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel>Instagram</InputLabel>
                        <PatternFormat
                          format="###.###.###.###"
                          mask="_"
                          fullWidth
                          customInput={TextField}
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
                        <PatternFormat
                          format="####.####.####.####"
                          mask="_"
                          fullWidth
                          customInput={TextField}
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
                        <PatternFormat
                          format="####:####:####:#:###:####:####:####"
                          mask="_"
                          fullWidth
                          customInput={TextField}
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
                        <PatternFormat
                          format="####:####:####:#:###:####:####:####"
                          mask="_"
                          fullWidth
                          customInput={TextField}
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
