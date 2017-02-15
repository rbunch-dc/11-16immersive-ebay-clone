import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import MovieReducer from './MovieReducer';
import GetHomeReducer from './GetHomeReducer';
import RegisterReducer from './RegisterReducer';

//pass into the object, each particular reducer (new files in reducers folder) 
const rootReducer = combineReducers({
	weather: WeatherReducer,
	movie: MovieReducer,
	home: GetHomeReducer,
	login: RegisterReducer
});

export default rootReducer; 