export default function (state = [], action){
	// console.log(action.type);
	switch(action.type){
		case 'getMovies': 
			console.log("hooray!!")
			return action.payload; 
		// Same as an else...
		default:
			return state;
	}
}