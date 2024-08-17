import { useState } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project-imports
import ClientForm from './ClientForm';
import ProjectForm from './ProjectForm';
import Review from './ImagesForm';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { generateSlug, postData } from 'utils/clientFunctions';

// step options
const steps = ['Client Information', 'Project details', 'Add Images'];

const getStepContent = (
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  clientInfo,
  setClientInfo,
  projectInfo,
  setProjectInfo,
  projectImages,
  setProjectImages,
  carouselImages,
  setCarouselImages,
  bannerImages,
  setBannerImages,
  iconImages,
  setIconImages
) => {
  switch (step) {
    case 0:
      return <ClientForm handleNext={handleNext} setErrorIndex={setErrorIndex} clientInfo={clientInfo} setClientInfo={setClientInfo} />;
    case 1:
      return (
        <ProjectForm
          handleNext={handleNext}
          handleBack={handleBack}
          setErrorIndex={setErrorIndex}
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
        />
      );
    case 2:
      return (
        <Review
          projectImages={projectImages}
          setProjectImages={setProjectImages}
          carouselImages={carouselImages}
          setCarouselImages={setCarouselImages}
          bannerImages={bannerImages}
          setBannerImages={setBannerImages}
          iconImages={iconImages}
          setIconImages={setIconImages}
        />
      );
    default:
      throw new Error('Unknown step');
  }
};

const uploadProject = async (projectDetails, iconImages, bannerImages, projectImages, carouselImages) => {
  const formData = {};

  // Append project details
  formData.companyName = projectDetails.companyName;
  formData.companyOverview = projectDetails.companyOverview;
  formData.firstName = projectDetails.firstName;
  formData.lastName = projectDetails.lastName;
  formData.projectType = projectDetails.projectType;
  formData.projectChallenge = projectDetails.projectChallenge;
  formData.projectConcept = projectDetails.projectConcept;
  formData.projectOverview = projectDetails.projectOverview;
  formData.projectSolution = projectDetails.projectSolution;
  formData.projectTitle = projectDetails.projectTitle;
  formData.publishDate = projectDetails.publishDate;
  formData.homepage = projectDetails.homepage || false;
  formData.slug = generateSlug(projectDetails.projectTitle);
  formData.iconImages = iconImages;
  formData.bannerImages = bannerImages;

  // Handle project images
  formData.projectImages = projectImages.map((file, index) => ({
    index,
    file
  }));

  // Handle carousel images
  formData.carouselImages = carouselImages.map((file, index) => ({
    index,
    file
  }));

  // API call to upload project
  return await postData(`${process.env.REACT_APP_API_URL}projects`, formData);
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const ValidationWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [clientInfo, setClientInfo] = useState({});
  const [projectInfo, setProjectInfo] = useState({});
  const [projectImages, setProjectImages] = useState(null);
  const [carouselImages, setCarouselImages] = useState(null);
  const [bannerImages, setBannerImages] = useState(null);
  const [iconImages, setIconImages] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (!(iconImages && bannerImages && carouselImages && projectImages)) {
        setErrorIndex(activeStep);
      } else {
        const projectDetails = {
          companyName: clientInfo.companyName,
          companyOverview: clientInfo.companyOverview,
          firstName: clientInfo.firstName,
          lastName: clientInfo.lastName,
          projectType: clientInfo.projectType,
          projectChallenge: projectInfo.projectChallenge,
          projectConcept: projectInfo.projectConcept,
          projectOverview: projectInfo.projectOverview,
          projectSolution: projectInfo.projectSolution,
          projectTitle: projectInfo.projectTitle,
          publishDate: projectInfo.publishDate,
          homepage: clientInfo.homepage ? true : false
        };
        const response = await uploadProject(projectDetails, iconImages, bannerImages, projectImages, carouselImages);
        if (response.success) {
          setActiveStep(activeStep + 1);
        }
      }
    } else {
      setActiveStep(activeStep + 1);
      setErrorIndex(null);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard title="Add Project">
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
              Project Added.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setClientInfo({});
                    setProjectInfo({});
                    setIconImages(null);
                    setBannerImages(null);
                    setCarouselImages(null);
                    setProjectImages(null);
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
            {getStepContent(
              activeStep,
              handleNext,
              handleBack,
              setErrorIndex,
              clientInfo,
              setClientInfo,
              projectInfo,
              setProjectInfo,
              projectImages,
              setProjectImages,
              carouselImages,
              setCarouselImages,
              bannerImages,
              setBannerImages,
              iconImages,
              setIconImages
            )}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Add Project' : 'Next'}
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

export default ValidationWizard;
