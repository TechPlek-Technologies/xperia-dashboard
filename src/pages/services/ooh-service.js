import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddServices from 'sections/add-service';
import { getData } from 'utils/clientFunctions';

// ==============================|| FORMS WIZARD ||============================== //

const OOhService = () => {
  const location = useLocation();
  let pathname = location.pathname;
  const [serviceData, setServiceData] = useState(null);
  console.log('Current Pathname:', pathname);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/services/find-by-slug${pathname}`);

        console.log('Fetched Data:', newData);

        setServiceData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pathname]);
  return (
    <Grid container spacing={2.5} justifyContent="center" key={pathname}>
      <Grid item xs={12} md={6} lg={7}>
        {serviceData && (
          <AddServices slug={pathname} serviceData={serviceData} setServiceData={setServiceData} serviceTitle={'Out of Home Services'} />
        )}
      </Grid>
    </Grid>
  );
};

export default OOhService;
