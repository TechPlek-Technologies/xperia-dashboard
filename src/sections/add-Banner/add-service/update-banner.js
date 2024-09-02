import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project-imports
import AddressForm from './BasicInfo';
import PaymentForm from './AdditonalInfo';
import Review from './Review';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { getData, postData } from 'utils/clientFunctions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
// step options
const steps = ['Primary Image', 'Secondary Image', 'Confirmation'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, basicInfo, setBasicInfo, additionalInfo, setAdditionalInfo) => {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} setErrorIndex={setErrorIndex} basicInfo={basicInfo} setBasicInfo={setBasicInfo} />;
    case 1:
      return (
        <PaymentForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
        />
      );
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const UpdateBanners = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [errorIndex, setErrorIndex] = useState(null);
  const { title } = useParams();

  const handleNext = async () => {
    const combinedData = {
      ...basicInfo,
      ...additionalInfo
    };

    if (activeStep === steps.length - 1) {
      const response = await postData(`${process.env.REACT_APP_API_URL}/home-banner`, combinedData);
      console.log(response);
      if (response.success) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Banner updated successfully.',
            variant: 'alert',
            // anchorOrigin: {
            //   vertical: 'top',
            //   horizontal: 'right'
            // },
            alert: {
              color: 'success'
            },
            close: false
          })
        );
      } else {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Failed to update banner. Please try again.',
            variant: 'alert',
            // anchorOrigin: {
            //   vertical: 'top',
            //   horizontal: 'right'
            // },
            alert: {
              color: 'error'
            },
            close: false
          })
        );
      }

      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }

    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedTitle = decodeURIComponent(title);
        const newData = await getData(`${process.env.REACT_APP_API_URL}/home-banner/find-by-title/${decodedTitle}`);
        console.log(newData);

        if (newData.success) {
          setBasicInfo({
            title: newData.data.title,
            main1259x724: newData.data.main1259x724,
            sub1024x589: newData.data.sub1024x589,
            sub768x442: newData.data.sub768x442,
            sub300x173: newData.data.sub300x173
          });
          setAdditionalInfo({
            banner541x724: newData.data.banner541x724,
            banner224x300: newData.data.banner224x300
          });
        } else {
          setBasicInfo({
            title: ' ',
            main1259x724: ' ',
            sub1024x589: ' ',
            sub768x442: ' ',
            sub300x173: ' '
          });
          setAdditionalInfo({
            banner541x724: ' ',
            banner224x300: ' '
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [title]);

  return (
    <MainCard title="Update Banner">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Banner Updated Successfully
            </Typography>
            <Typography variant="subtitle1">Banner is now live on website</Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setBasicInfo({});
                    setAdditionalInfo({});
                    setActiveStep(0);
                  }}
                  sx={{ my: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, basicInfo, setBasicInfo, additionalInfo, setAdditionalInfo)}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
};

export default UpdateBanners;
