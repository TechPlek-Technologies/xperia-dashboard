import { useEffect, useState } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project-imports
import ClientForm from './ClientForm';
import ProjectForm from './ProjectForm';
import Review from './ImagesForm';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { generateSlug, getData, postData } from 'utils/clientFunctions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useParams } from 'react-router';

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

const uploadProject = async (id, projectDetails, iconImages, bannerImages, projectImages, carouselImages) => {
  const data = {};

  // Append project details
  data.id = id;
  data.companyName = projectDetails.companyName;
  data.companyOverview = projectDetails.companyOverview;
  data.firstName = projectDetails.firstName;
  data.lastName = projectDetails.lastName;
  data.projectType = projectDetails.projectType;
  data.projectChallenge = projectDetails.projectChallenge;
  data.projectConcept = projectDetails.projectConcept;
  data.projectOverview = projectDetails.projectOverview;
  data.projectSolution = projectDetails.projectSolution;
  data.projectTitle = projectDetails.projectTitle;
  data.publishDate = projectDetails.publishDate;
  data.homepage = projectDetails.homepage || false;
  data.slug = generateSlug(projectDetails.projectTitle);
  data.iconImages = iconImages;
  data.bannerImages = bannerImages;
  data.category = projectDetails.category;

  // Handle project images
  data.projectImages = projectImages;

  // Handle carousel images
  data.carouselImages = carouselImages;

  // API call to upload project
  return await postData(`${process.env.REACT_APP_API_URL}/projects`, data);
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const ValidationWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    projectType: '',
    companyName: '',
    companyOverview: '',
    homepage: false // Ensure this is properly set
  });
  const [projectInfo, setProjectInfo] = useState({});
  const [projectImages, setProjectImages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [bannerImages, setBannerImages] = useState(null);
  const [iconImages, setIconImages] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);
  const { id } = useParams();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (!(iconImages && bannerImages && carouselImages && projectImages)) {
        setErrorIndex(activeStep);
      } else {
        console.log(projectInfo);

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
          category: projectInfo.category,
          homepage: clientInfo.homepage ? true : false
        };

        const response = await uploadProject(id, projectDetails, iconImages, bannerImages, projectImages, carouselImages);
        if (response.success) {
          setActiveStep(activeStep + 1);
          dispatch(
            openSnackbar({
              open: true,
              message: 'Details added successfully.',
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
              message: 'Failed to add details. Please try again.',
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
      }
    } else {
      setActiveStep(activeStep + 1);
      setErrorIndex(null);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/projects/find-by-id/${id}`);
        console.log('newData', newData);

        if (newData.success) {
          setClientInfo({
            firstName: newData.data.firstName,
            lastName: newData.data.lastName,
            projectType: newData.data.projectType,
            companyName: newData.data.companyName,
            companyOverview: newData.data.companyOverview,
            homepage: newData.data.homepage
          });
          setProjectInfo({
            projectTitle: newData.data.projectTitle,
            publishDate: newData.data.publishDate,
            category: newData.data.category,
            projectOverview: newData.data.projectOverview,
            projectChallenge: newData.data.projectChallenge,
            projectConcept: newData.data.projectConcept,
            projectSolution: newData.data.projectSolution
          });
          setProjectImages(newData.data.projectImages || []);
          setCarouselImages(newData.data.carouselImages || []);
          setBannerImages(newData.data.bannerImages || []);
          setIconImages(newData.data.iconImages || []);
        } else {
          setClientInfo({
            firstName: ' ',
            lastName: ' ',
            projectType: ' ',
            companyName: ' ',
            companyOverview: ' '
          });
          setProjectInfo({
            projectTitle: ' ',
            publishDate: ' ',
            category: ' ',
            projectOverview: ' ',
            projectChallenge: ' ',
            projectConcept: ' ',
            projectSolution: ' '
          });
          setProjectImages({ projectImages: null });
          setCarouselImages({ carouselImages: null });
          setBannerImages({ bannerImages: null });
          setIconImages({ iconImages: null });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
                    setCarouselImages([]);
                    setProjectImages([]);
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
