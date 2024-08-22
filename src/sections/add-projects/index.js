import { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project-imports
import AddressForm from './BasicInfo';
import PaymentForm from './AdditonalInfo';
import Review from './Review';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { postData } from 'utils/clientFunctions';

// step options
const steps = ['Primary Information', 'Additonal Information', 'Confirmation'];

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

const AddProjectsSection = ({ slug }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState({
    // title: serviceData.title || null,
    // shortDescription: serviceData.shortDescription || null,
    // longDescription: serviceData.longDescription || null,
    // banner: serviceData.banner || null,
    // carousel1: serviceData.carousel1 || null,
    // carousel2: serviceData.carousel2 || null,
    // carousel3: serviceData.carousel3 || null
  });
  const [additionalInfo, setAdditionalInfo] = useState({
    // title1: serviceData.title1 || null,
    // title2: serviceData.title2 || null,
    // title3: serviceData.title3 || null,
    // title4: serviceData.title4 || null,
    // title5: serviceData.title5 || null,
    // content1: serviceData.content1 || null,
    // content2: serviceData.content2 || null,
    // content3: serviceData.content3 || null,
    // content4: serviceData.content4 || null,
    // content5: serviceData.content5 || null
  });
  const [errorIndex, setErrorIndex] = useState(null);

  function removeFirstSlash(str) {
    // Replace only the first occurrence of /
    return str.replace('/', '');
  }
  const handleNext = async () => {
    const combinedData = {
      ...basicInfo,
      ...additionalInfo,
      slug: removeFirstSlash(slug)
    };
    console.log(slug);

    if (activeStep === steps.length - 1) {
      const response = await postData(`${process.env.REACT_APP_API_URL}/services`, combinedData);
      console.log(response);

      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }

    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard title={'Add Projects'}>
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
              Service Added Successfully
            </Typography>
            <Typography variant="subtitle1">Service is now live on website</Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
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

export default AddProjectsSection;

AddProjectsSection.propTypes = {
  serviceTitle: PropTypes.string,
  services: PropTypes.string,
  slug: PropTypes.string,
  serviceData: PropTypes.object
};
