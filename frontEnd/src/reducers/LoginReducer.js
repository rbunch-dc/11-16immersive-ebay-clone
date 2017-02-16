export default function(state = [], action){
	console.log("$$$$$$$$$$$$$$$$$$$$$$");
	console.log(action.type);
	console.log(action.payload);
	console.log("$$$$$$$$$$$$$$$$$$$$$$");
	switch(action.type){
		case "LOGIN":
			// console.log("I'm the register reducer, and some action called REGISTER!!!");
			// console.log(action.payload);
			return action.payload
	}
	return state;
}