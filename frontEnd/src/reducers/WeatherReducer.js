export default function (state = null, action){
	console.log(action.type)
	switch(action.type){
	case "getWeather":
		console.log(action.payload);
		return (action.payload);
		// break;
	case "somethingElse":
		console.log("Shouldn't see this")
		break;
	}
	return state;
}