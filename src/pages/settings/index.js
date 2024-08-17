// material-ui
import { FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import MainCard from 'components/MainCard';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';

// ==============================|| PLUGIN - MASK INPUT ||============================== //

const SettingsPage = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MainCard title="Main Logo">
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Navbar Logo</InputLabel>
                  <SingleFileUpload
                    id="awardImage"
                    name="awardImage"
                    // setFieldValue={formik.setFieldValue}
                    // setImages={handleawardImageChange}
                    // file={formik.values.files}
                    // error={formik.touched.awardImage && Boolean(formik.errors.awardImage)}
                    // helperText={formik.touched.awardImage && formik.errors.awardImage}
                  />
                </Stack>
                <FormHelperText>{'Award image is required'}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Footer Logo</InputLabel>
                  <SingleFileUpload
                    id="awardImage"
                    name="awardImage"
                    // setFieldValue={formik.setFieldValue}
                    // setImages={handleawardImageChange}
                    // file={formik.values.files}
                    // error={formik.touched.awardImage && Boolean(formik.errors.awardImage)}
                    // helperText={formik.touched.awardImage && formik.errors.awardImage}
                  />
                </Stack>
                <FormHelperText>{'Award image is required'}</FormHelperText>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard title="Other Logos">
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Favicon</InputLabel>
                  <SingleFileUpload
                    id="awardImage"
                    name="awardImage"
                    // setFieldValue={formik.setFieldValue}
                    // setImages={handleawardImageChange}
                    // file={formik.values.files}
                    // error={formik.touched.awardImage && Boolean(formik.errors.awardImage)}
                    // helperText={formik.touched.awardImage && formik.errors.awardImage}
                  />
                </Stack>
                <FormHelperText>{'Award image is required'}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Sidebar Logo</InputLabel>
                  <SingleFileUpload
                    id="awardImage"
                    name="awardImage"
                    // setFieldValue={formik.setFieldValue}
                    // setImages={handleawardImageChange}
                    // file={formik.values.files}
                    // error={formik.touched.awardImage && Boolean(formik.errors.awardImage)}
                    // helperText={formik.touched.awardImage && formik.errors.awardImage}
                  />
                </Stack>
                <FormHelperText>{'Award image is required'}</FormHelperText>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard title="Contact Details">
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Phone Number</InputLabel>
                  <PatternFormat format="+1 (###) ###-####" mask="_" fullWidth customInput={TextField} placeholder="Phone Number" />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Email</InputLabel>
                  <PatternFormat format="+91 #### ###-####" mask="_" fullWidth customInput={TextField} placeholder="Contact Number" />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Address</InputLabel>
                  <PatternFormat format="(##) ####-#####" mask="_" fullWidth customInput={TextField} placeholder="Tel. with Code Area" />
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard title="Social Media">
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Instagram</InputLabel>
                  <PatternFormat format="###.###.###.###" mask="_" fullWidth customInput={TextField} placeholder="IP Address" />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Facebook</InputLabel>
                  <PatternFormat format="####.####.####.####" mask="_" fullWidth customInput={TextField} placeholder="IPV4" />
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
                    placeholder="IPV6"
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
                    placeholder="IPV6"
                  />
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SettingsPage;
