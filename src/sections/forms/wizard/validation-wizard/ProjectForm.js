import PropTypes from 'prop-types';

// material-ui
import { Button, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { FormControl } from '@mui/base';

const validationSchema = yup.object({
  projectTitle: yup.string().required('Project Title is required'),
  category: yup.string().required('Category is required'),
  publishDate: yup.string().required('Publish Date is required'),
  projectOverview: yup.string().required('Project Overview is required'),
  projectChallenge: yup.string().required('Project Challenge is required'),
  projectConcept: yup.string().required('Project Concept is required'),
  projectSolution: yup.string().required('Project Solution is required')
});

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export default function ProjectForm({ projectInfo, setProjectInfo, handleNext, handleBack, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      projectTitle: projectInfo.projectTitle || '',
      publishDate: projectInfo.publishDate || '',
      projectOverview: projectInfo.projectOverview || '',
      projectChallenge: projectInfo.projectChallenge || '',
      projectConcept: projectInfo.projectConcept || '',
      projectSolution: projectInfo.projectSolution || '',
      category: projectInfo.category || ''
    },
    validationSchema,
    onSubmit: (values) => {
      setProjectInfo({
        projectTitle: values.projectTitle,
        publishDate: values.publishDate,
        projectOverview: values.projectOverview,
        projectChallenge: values.projectChallenge,
        projectConcept: values.projectConcept,
        projectSolution: values.projectSolution,
        category: values.category
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Payment method
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel>Project Title</InputLabel>
              <TextField
                id="projectTitle"
                name="projectTitle"
                value={formik.values.projectTitle}
                onChange={formik.handleChange}
                error={formik.touched.projectTitle && Boolean(formik.errors.projectTitle)}
                helperText={formik.touched.projectTitle && formik.errors.projectTitle}
                placeholder="Project Title"
                fullWidth
                autoComplete="title"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel>Publish Date</InputLabel>
              <TextField
                id="publishDate"
                name="publishDate"
                placeholder="Publish Date *"
                value={formik.values.publishDate}
                onChange={formik.handleChange}
                error={formik.touched.publishDate && Boolean(formik.errors.publishDate)}
                helperText={formik.touched.publishDate && formik.errors.publishDate}
                fullWidth
                autoComplete="date"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel id="category">Category</InputLabel>
              <FormControl error={formik.touched.category && Boolean(formik.errors.category)}>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  // helperText={formik.touched.category && formik.errors.category}
                  placeholder="Category"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'brands'}>Brands</MenuItem>
                  <MenuItem value={'ooh'}>OOH</MenuItem>
                  <MenuItem value={'events'}>Events</MenuItem>
                  <MenuItem value={'activation'}>Activation</MenuItem>
                  <MenuItem value={'multiplex'}>Multiplex Cinema</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Project Overview</InputLabel>
              <TextField
                id="projectOverview"
                name="projectOverview"
                placeholder="Project Overview *"
                value={formik.values.projectOverview}
                onChange={formik.handleChange}
                error={formik.touched.projectOverview && Boolean(formik.errors.projectOverview)}
                helperText={formik.touched.projectOverview && formik.errors.projectOverview}
                fullWidth
                multiline
                rows={6}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Project Challenge</InputLabel>
              <TextField
                id="projectChallenge"
                name="projectChallenge"
                placeholder="Project Challenge *"
                value={formik.values.projectChallenge}
                onChange={formik.handleChange}
                error={formik.touched.projectChallenge && Boolean(formik.errors.projectChallenge)}
                helperText={formik.touched.projectChallenge && formik.errors.projectChallenge}
                multiline
                rows={3}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Project Concept</InputLabel>
              <TextField
                id="projectConcept"
                name="projectConcept"
                placeholder="Project Concept *"
                value={formik.values.projectConcept}
                onChange={formik.handleChange}
                error={formik.touched.projectConcept && Boolean(formik.errors.projectConcept)}
                helperText={formik.touched.projectConcept && formik.errors.projectConcept}
                multiline
                rows={3}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Project Solution</InputLabel>
              <TextField
                id="projectSolution"
                name="projectSolution"
                placeholder="Project Solution *"
                value={formik.values.projectSolution}
                onChange={formik.handleChange}
                error={formik.touched.projectSolution && Boolean(formik.errors.projectSolution)}
                helperText={formik.touched.projectSolution && formik.errors.projectSolution}
                multiline
                rows={3}
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
}

ProjectForm.propTypes = {
  projectInfo: PropTypes.object,
  setProjectInfo: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};
