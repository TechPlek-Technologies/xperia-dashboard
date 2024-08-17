// material-ui
import PropTypes from 'prop-types';
// material-ui

// project-imports
import MainCard from 'components/MainCard';
import Editor from 'sections/Editor/TextEditor';

// ==============================|| SAMPLE PAGE ||============================== //

const XperiaGroup = ({ title }) => {
  return (
    <MainCard title={title}>
      <Editor subtitle={'Edit Xperia Group'} />
    </MainCard>
  );
};

XperiaGroup.propTypes = {
  title: PropTypes.string
};

export default XperiaGroup;
