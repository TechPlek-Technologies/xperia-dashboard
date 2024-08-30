import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, InputLabel, Stack, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { useState } from 'react';

const validationSchema = yup.object({
  banner541x724: yup.mixed().required('Banner image (541x724) is required'),
  banner224x300: yup.mixed().required('Banner image (224x300) is required')
});

const AdditionalInfo = ({ additionalInfo, setAdditionalInfo, handleNext, handleBack, setErrorIndex }) => {
  const [banner541x724, setBanner541x724] = useState(additionalInfo.banner541x724 || null);
  const [banner224x300, setBanner224x300] = useState(additionalInfo.banner224x300 || null);

  const formik = useFormik({
    initialValues: {
      banner541x724: additionalInfo.banner541x724 || null,
      banner224x300: additionalInfo.banner224x300 || null
      // files: []
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: () => {
      setAdditionalInfo({
        banner541x724: banner541x724,
        banner224x300: banner224x300
      });

      handleNext();
    }
  });

  const handleBannerImageChange541x724 = (images) => {
    setBanner541x724(images);
    formik.setFieldValue('banner541x724', images);
  };

  const handleBannerImageChange224x300 = (images) => {
    setBanner224x300(images);
    formik.setFieldValue('banner224x300', images);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Secondary Banner Images
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel>Banner Dimension 541 X 724</InputLabel>
            <Stack spacing={1.5}>
              <SingleFileUpload
                id="banner541x724"
                name="banner541x724"
                images={banner541x724}
                setFieldValue={formik.setFieldValue}
                setImages={handleBannerImageChange541x724}
                file={banner541x724}
                error={formik.touched.banner541x724 && Boolean(formik.errors.banner541x724)}
                helperText={formik.touched.banner541x724 && formik.errors.banner541x724}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Banner Dimension 224 X 300</InputLabel>
            <Stack spacing={1.5}>
              <SingleFileUpload
                id="banner224x300"
                name="banner224x300"
                images={banner224x300}
                setFieldValue={formik.setFieldValue}
                setImages={handleBannerImageChange224x300}
                file={banner224x300}
                error={formik.touched.banner224x300 && Boolean(formik.errors.banner224x300)}
                helperText={formik.touched.banner224x300 && formik.errors.banner224x300}
              />
            </Stack>
          </Grid>
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
};

AdditionalInfo.propTypes = {
  additionalInfo: PropTypes.object,
  setAdditionalInfo: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};

export default AdditionalInfo;
