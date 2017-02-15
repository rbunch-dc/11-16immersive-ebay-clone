import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import MovieReducer from './MovieReducer';
import GetHomeReducer from './GetHomeReducer';

//pass into the object, each particular reducer (new files in reducers folder) 
const rootReducer = combineReducers({
	weather: WeatherReducer,
	movie: MovieReducer,
	home: GetHomeReducer
});

export default rootReducer; 