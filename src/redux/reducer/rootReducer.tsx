import { combineReducers } from 'redux'
import globalErrorReducer from './globalErrorReducer';

const rootReducer = combineReducers({
    globalError: globalErrorReducer
});

export default rootReducer;