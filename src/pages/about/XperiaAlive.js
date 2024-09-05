// material-ui
import PropTypes from 'prop-types';
// material-ui

// project-imports
import MainCard from 'components/MainCard';
import Editor from 'sections/Editor/TextEditor';
import { getData, postData } from 'utils/clientFunctions';
import { useEffect, useState } from 'react';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ==============================|| SAMPLE PAGE ||============================== //

const XperiaAlive = ({ title }) => {
  const [aboutData, setAboutData] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData(`${process.env.REACT_APP_API_URL}/about/find-by-slug/xperia-alive`);
        console.log('newData', newData);
        if (newData.success) {
          setAboutData(newData.data);
        } else {
          setAboutData({
            name: '',
            description: '',
            slug: '',
            aboutImage: null
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (aboutData) => {
    console.log('aboutData', aboutData);

    const response = await postData(`${process.env.REACT_APP_API_URL}/about`, aboutData);
    if (response.success) {
      setKey(key + 1);
    }
    console.log(response);
    if (response.success) {
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
    // Optionally, you can update the state here if you need to reflect changes immediately
  };
  return (
    <MainCard title={title}>
      {aboutData && (
        <Editor
          aboutData={aboutData}
          setAboutData={setAboutData}
          titleText={'Edit Xperia Alive'}
          handleSubmit={handleSubmit}
          subtitle={'Edit Xperia Alive Content'}
          placeholder={'Title Header'}
          slug={'xperia-alive'}
        />
      )}
    </MainCard>
  );
};

export default XperiaAlive;

XperiaAlive.propTypes = {
  title: PropTypes.string
};
