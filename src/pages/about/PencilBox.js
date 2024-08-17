// material-ui
import PropTypes from 'prop-types';
// material-ui

// project-imports
import MainCard from 'components/MainCard';
import Editor from 'sections/Editor/TextEditor';

// ==============================|| SAMPLE PAGE ||============================== //

const PencilBox = ({ title }) => {
  return (
    <MainCard title={title}>
      <Editor subtitle={'Edit Pencil Box'} />
    </MainCard>
  );
};

export default PencilBox;

PencilBox.propTypes = {
  title: PropTypes.string
};
