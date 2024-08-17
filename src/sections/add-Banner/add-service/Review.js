import { Fragment } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// ==============================|| VALIDATION WIZARD - REVIEW  ||============================== //

export default function Review() {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Confirmation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Add New Banner?
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
