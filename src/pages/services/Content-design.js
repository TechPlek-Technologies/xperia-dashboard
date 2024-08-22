import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddServices from 'sections/add-service';
import { getData } from 'utils/clientFunctions';

// ==============================|| FORMS WIZARD ||============================== //

const ContentDesign = () => {
  const location = useLocation();
  let pathname = location.pathname;
  const [serviceData, setServiceData] = useState(null);
  console.log('Current Pathname:', pathname);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/services/find-by-slug${pathname}`);

        setServiceData(newData.data);
        if (newData.success) {
          setServiceData(newData.data);
        } else {
          setServiceData({
            title: null,
            shortDescription: null,
            longDescription: null,
            banner: null,
            carousel1: null,
            carousel2: null,
            carousel3: null,
            title1: null,
            title2: null,
            title3: null,
            title4: null,
            title5: null,
            content1: null,
            content2: null,
            content3: null,
            content4: null,
            content5: null
          });
        }
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
          <AddServices slug={pathname} serviceData={serviceData} setServiceData={setServiceData} serviceTitle={'Content Design Services'} />
        )}
      </Grid>
    </Grid>
  );
};

export default ContentDesign;
