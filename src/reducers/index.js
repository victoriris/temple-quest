/*  Reducers
 *  These listen actions and handle changes to the 
 *  appropiate part of the state
 */ 
import { combineReducers } from 'redux';
import ExampleReducer from './ExampleReducer';


export default combineReducers({
    example: ExampleReducer
});