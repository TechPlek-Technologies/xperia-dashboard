import PropTypes from 'prop-types';
// material-ui
import { FormHelperText, Grid, Stack } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import UploadSingleFile from 'components/third-party/dropzone/SingleFile';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import IconButton from 'components/@extended/IconButton';

// assets
import { Category, TableDocument } from 'iconsax-react';
import { useState } from 'react';
// import { addNewFilesLocal } from 'utils/clientFunctions';
// ==============================|| VALIDATION WIZARD - REVIEW  ||============================== //

export default function ImagesForm({
  iconImages,
  bannerImages,
  carouselImages,
  projectImages,
  setProjectImages,
  setCarouselImages,
  setBannerImages,
  setIconImages
}) {
  const [list, setList] = useState(false);
  const [list1, setList1] = useState(false);

  console.log('carouselImages', carouselImages);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="Upload Icon Image">
            <Formik
              initialValues={{ files: null }}
              onSubmit={(values) => {
                // submit form
                console.log(values);
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Image is required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <UploadSingleFile
                          name="files"
                          images={iconImages}
                          setImages={setIconImages}
                          setFieldValue={setFieldValue}
                          file={values.files}
                          error={touched.files && !!errors.files}
                        />
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard title="Upload Banner Image">
            <Formik
              initialValues={{ files: null }}
              onSubmit={() => {
                // submit form
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Image is a required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <UploadSingleFile
                          name="files"
                          images={bannerImages}
                          setFieldValue={setFieldValue}
                          setImages={setBannerImages}
                          file={values.files}
                          error={touched.files && !!errors.files}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard
            title="Upload Project Images"
            secondary={
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <IconButton color={list ? 'secondary' : 'primary'} size="small" onClick={() => setList(false)}>
                  <TableDocument style={{ fontSize: '1.15rem' }} />
                </IconButton>
                <IconButton color={list ? 'primary' : 'secondary'} size="small" onClick={() => setList(true)}>
                  <Category style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            }
          >
            <Formik
              initialValues={{ files: projectImages || [] }}
              onSubmit={() => {
                // submit form
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Atleast 1 Image is required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <UploadMultiFile
                          name="files"
                          showList={list}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          onUpload={async () => {
                            // const response = await addNewFilesLocal(values.files);
                            // console.log(response);
                            // setProjectImages(values.files);
                            console.log(projectImages);
                          }}
                          setImages={setProjectImages}
                          error={touched.files && !!errors.files}
                        />
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard
            title="Upload Carousel Images"
            secondary={
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <IconButton color={list ? 'secondary' : 'primary'} size="small" onClick={() => setList1(false)}>
                  <TableDocument style={{ fontSize: '1.15rem' }} />
                </IconButton>
                <IconButton color={list ? 'primary' : 'secondary'} size="small" onClick={() => setList1(true)}>
                  <Category style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            }
          >
            <Formik
              initialValues={{ files: carouselImages || [] }}
              onSubmit={() => {
                // submit form
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required('Atleast 1 Image is required.')
              })}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <UploadMultiFile
                          name="files"
                          showList={list1}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          error={touched.files && !!errors.files}
                          onUpload={() => {
                            // setCarouselImages(values.files);
                            console.log('carouselImages', carouselImages);
                          }}
                          setImages={setCarouselImages}
                        />
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

ImagesForm.propTypes = {
  bannerImages: PropTypes.object,
  carouselImages: PropTypes.object,
  projectImages: PropTypes.object,
  iconImages: PropTypes.object,
  setProjectImages: PropTypes.func,
  setCarouselImages: PropTypes.func,
  setBannerImages: PropTypes.func,
  setIconImages: PropTypes.func
};
