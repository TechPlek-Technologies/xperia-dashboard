import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { Fragment } from 'react';

const validationSchema = yup.object({
  title1: yup.string().required('Title 1 is required'),
  content1: yup.string().required('Content 1 is required'),

  title2: yup.string().required('Title 2 is required'),
  content2: yup.string().required('Content 2 is required'),

  title3: yup.string().required('Title 3 is required'),
  content3: yup.string().required('Content 3 is required'),

  title4: yup.string().required('Title 4 is required'),
  content4: yup.string().required('Content 4 is required'),

  title5: yup.string().required('Title 5 is required'),
  content5: yup.string().required('Content 5 is required')
});
const AdditionalInfo = ({ additionalInfo, setAdditionalInfo, handleNext, handleBack, setErrorIndex }) => {
  const formik = useFormik({
    initialValues: {
      title1: additionalInfo.title1 || '',
      title2: additionalInfo.title2 || '',
      title3: additionalInfo.title3 || '',
      title4: additionalInfo.title4 || '',
      title5: additionalInfo.title5 || '',
      content1: additionalInfo.content1 || '',
      content2: additionalInfo.content2 || '',
      content3: additionalInfo.content3 || '',
      content4: additionalInfo.content4 || '',
      content5: additionalInfo.content5 || ''
    },
    validationSchema,
    onSubmit: (values) => {
      setAdditionalInfo(values);
      console.log(additionalInfo);

      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Additional Information
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5].map((index) => (
            <Fragment key={index}>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel>{`Title ${index}`}</InputLabel>
                  <TextField
                    id={`title${index}`}
                    name={`title${index}`}
                    value={formik.values[`title${index}`]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[`title${index}`] && Boolean(formik.errors[`title${index}`])}
                    helperText={formik.touched[`title${index}`] && formik.errors[`title${index}`]}
                    placeholder={`Title ${index}`}
                    fullWidth
                    autoComplete={`title${index}`}
                    multiline
                    rows={3}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack spacing={1}>
                  <InputLabel>{`Content ${index}`}</InputLabel>
                  <TextField
                    id={`content${index}`}
                    name={`content${index}`}
                    value={formik.values[`content${index}`]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[`content${index}`] && Boolean(formik.errors[`content${index}`])}
                    helperText={formik.touched[`content${index}`] && formik.errors[`content${index}`]}
                    placeholder={`Content ${index}`}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Stack>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ my: 3, ml: 1 }}
                  onClick={() => {
                    if (Object.keys(formik.errors).length > 0) {
                      setErrorIndex(1);
                    }
                  }}
                >
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

AdditionalInfo.propTypes = {
  additionalInfo: PropTypes.object,
  setAdditionalInfo: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};

export default AdditionalInfo;
