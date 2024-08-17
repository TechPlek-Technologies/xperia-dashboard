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
  cardName: yup.string().required('Card Name is required'),
  cardNumber: yup.string().required('Card Number is required')
});

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export default function AdditionalInfo({ additionalInfo, setAdditionalInfo, handleNext, handleBack, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      cardName: additionalInfo.cardName,
      cardNumber: additionalInfo.cardNumber
    },
    validationSchema,
    onSubmit: (values) => {
      setAdditionalInfo({
        cardName: values.cardName,
        cardNumber: values.cardNumber
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Additonal Information
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
                    placeholder={`Content ${index}`}
                    value={formik.values[`content${index}`]}
                    onChange={formik.handleChange}
                    error={formik.touched[`content${index}`] && Boolean(formik.errors[`content${index}`])}
                    helperText={formik.touched[`content${index}`] && formik.errors[`content${index}`]}
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
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

AdditionalInfo.propTypes = {
  additionalInfo: PropTypes.object,
  setAdditionalInfo: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};
