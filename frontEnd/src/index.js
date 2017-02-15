import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reduxPromise from 'redux-promise';

// To wire up redux we need: 
// 1. provider( react-redux)
// 2. createStore(redux)
// 3. reducers to pass to createStore (./reducer) (rootReducer) 
// 4. Make  root reducer to import other reducers
// 5. make a single reducer to import into rootReducer
// 6. create the store (2) with the reducer (3)
// 7. Wrap the provider (1) with store prop (4) around App 


//8. Make a container with react


//step ONE
import {Provider} from 'react-redux';

//step TWO
import { createStore, applyMiddleware } from 'redux'; 

//step THREE
import reducers from './reducers/index.js';

//import redux promise

//step SIX
// arg is the root reducer
// const theStore = createStore(reducers);
// const middleWare = applyMiddleware(reduxPromise);
// const theStore = middleWare(createStore); 
// const theStoreWithMiddleware = theStore(reducers); 
// OR write it like below:
const theStoreWithMiddleware = applyMiddleware()(createStore)

ReactDOM.render(
	//step SEVEN
	<Provider store={theStoreWithMiddleware(reducers)}>	
  		<App />
  	</Provider>,
  document.getElementById('root')
);
