// material-ui
import { Grid } from '@mui/material';
import AddServices from 'sections/add-service';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

const AddService = () => (
  <Grid container spacing={2.5} justifyContent="center">
    <Grid item xs={12} md={6} lg={7}>
      <AddServices />
    </Grid>
  </Grid>
);

export default AddService;
