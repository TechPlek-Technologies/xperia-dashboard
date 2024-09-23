import PropTypes from 'prop-types';

// material-ui
import { Button, Checkbox, FormControlLabel, Grid, InputLabel, Stack, Typography, TextField } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  projectType: yup.string().required('Project Type is required'),
  companyName: yup.string().required('Company name is required'),
  companyOverview: yup.string().required('Company Overview is required')
});

// ==============================|| VALIDATION WIZARD - ADDRESS  ||============================== //

const ClientForm = ({ clientInfo, setClientInfo, handleNext, setErrorIndex }) => {
  console.log('clientInfo', clientInfo);
  const formik = useFormik({
    initialValues: {
      firstName: clientInfo.firstName,
      lastName: clientInfo.lastName,
      projectType: clientInfo.projectType,
      companyName: clientInfo.companyName,
      companyOverview: clientInfo.companyOverview,
      homepage: clientInfo.homepage
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setClientInfo({
        firstName: values.firstName,
        lastName: values.lastName,
        projectType: values.projectType,
        companyName: values.companyName,
        companyOverview: values.companyOverview,
        homepage: values.homepage
      });
      handleNext();
    }
  });

  console.log('formik.values.homepage', formik.values.homepage);
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Client Details
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>First Name</InputLabel>
              <TextField
                id="firstName"
                name="firstName"
                placeholder="First Name *"
                value={formik.values.firstName || ''}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Last Name</InputLabel>
              <TextField
                id="lastName"
                name="lastName"
                placeholder="Last Name *"
                value={formik.values.lastName || ''}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
                autoComplete="family-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Project Type</InputLabel>
              <TextField
                id="projectType"
                name="projectType"
                placeholder="Project Type *"
                value={formik.values.projectType || ''}
                onChange={formik.handleChange}
                error={formik.touched.projectType && Boolean(formik.errors.projectType)}
                helperText={formik.touched.projectType && formik.errors.projectType}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Company Name</InputLabel>
              <TextField
                id="companyName"
                name="companyName"
                placeholder="Company Name *"
                value={formik.values.companyName || ''}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Company Overview</InputLabel>
              <TextField
                id="companyOverview"
                name="companyOverview"
                placeholder="Company Overview *"
                value={formik.values.companyOverview || ''}
                onChange={formik.handleChange}
                error={formik.touched.companyOverview && Boolean(formik.errors.companyOverview)}
                helperText={formik.touched.companyOverview && formik.errors.companyOverview}
                fullWidth
                multiline
                rows={3}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="primary" id="homepage" name="homepage" checked={formik.values.homepage} onChange={formik.handleChange} />
              }
              label="Use this project on Homepage (max-8)"
            />
          </Grid>

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

ClientForm.propTypes = {
  clientInfo: PropTypes.object,
  setClientInfo: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};

export default ClientForm;
