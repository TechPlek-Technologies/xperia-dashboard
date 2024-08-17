// third-party
import { combineReducers } from 'redux';

// project-imports
import menu from './menu';
import snackbar from './snackbar';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar
});

export default reducers;
