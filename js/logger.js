var isDebug = true;
var logger = {
	log: function(msg){
		console.log(msg);
	},
	debugLog: function(msg){
		if(isDebug){
			this.log(msg);
		}
	}
}