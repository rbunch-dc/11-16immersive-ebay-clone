export default function(state = [], action){
	switch(action.type){
		case "SUBMIT_BID":
			// console.log("I'm the register reducer, and some action called REGISTER!!!");
			console.log(action.payload);
			return action.payload
		// Same as an else...
		default:
			return state;
	}
}