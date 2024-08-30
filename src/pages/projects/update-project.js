// material-ui
import { Grid } from '@mui/material';

// project-imports
import ValidationWizard from 'sections/forms/wizard/validation-wizard';
// import AddProjectsSection from 'sections/add-projects';

// ==============================|| FORMS WIZARD ||============================== //

const AddProjects = () => (
  <Grid container spacing={2.5} justifyContent="center">
    <Grid item xs={12} md={6} lg={7}>
      <ValidationWizard />
      {/* <AddProjectsSection serviceData={serviceData} setServiceData={setServiceData} /> */}
    </Grid>
  </Grid>
);

export default AddProjects;
