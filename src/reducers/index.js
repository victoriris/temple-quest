/*  Reducers
 *  These listen actions and handle changes to the 
 *  appropiate part of the state
 */ 
import { combineReducers } from 'redux';
import ExampleReducer from './ExampleReducer';
import IntroReducer from './IntroReducer';
import BoardReducer from './BoardReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
    example: ExampleReducer,
    intro: IntroReducer,
    board: BoardReducer,
    network: ChatReducer,
});