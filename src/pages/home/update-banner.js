// material-ui
import { Grid } from '@mui/material';
import UpdateBanners from 'sections/add-Banner/add-service/update-banner';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

const UpdateBanner = () => (
  <Grid container spacing={2.5} justifyContent="center">
    <Grid item xs={12} md={6} lg={7}>
      <UpdateBanners />
    </Grid>
  </Grid>
);

export default UpdateBanner;
