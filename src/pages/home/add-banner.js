// material-ui
import { Grid } from '@mui/material';
import AddBanners from 'sections/add-Banner/add-service';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

const AddBanner = () => (
  <Grid container spacing={2.5} justifyContent="center">
    <Grid item xs={12} md={6} lg={7}>
      <AddBanners />
    </Grid>
  </Grid>
);

export default AddBanner;
