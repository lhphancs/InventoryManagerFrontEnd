import { combineReducers } from 'redux'
import globalMessagesReducer from './globalMessagesReducer';

const rootReducer = combineReducers({
    globalMessages: globalMessagesReducer
});

export default rootReducer;