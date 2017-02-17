export default function(state = [], action){
	// console.log(action.type);
	switch(action.type){
		case "GET_AUCTION_DETAIL":
			// console.log("I'm the gethomereducer, and some action called GET_HOME!!!");
			return action.payload
		// Same as an else...
		default:
			return state;
	}
}