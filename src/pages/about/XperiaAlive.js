// material-ui
import PropTypes from 'prop-types';
// material-ui

// project-imports
import MainCard from 'components/MainCard';
import Editor from 'sections/Editor/TextEditor';

// ==============================|| SAMPLE PAGE ||============================== //

const XperiaAlive = ({ title }) => {
  return (
    <MainCard title={title}>
      <Editor subtitle={'Edit Xperia Alive'} />
    </MainCard>
  );
};

export default XperiaAlive;

XperiaAlive.propTypes = {
  title: PropTypes.string
};
