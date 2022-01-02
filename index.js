// REMINDER THIS IS A PROJECT THAT IS IN DEVELOPMENT
// THIS IS A TEST APP TO TRY TO GET THE API WORKING
/*
module.exports = {

    API: require("./src/api"),
    Maps: require("./src/maps"),
	Regions: require("./src/regions"),
	
};*/

const axios = require('axios');

// test get, replace api key
axios.get("https://na.api.riotgames.com/val/status/v1/platform-data?api_key=??????????????????").then(resp => {

	console.log(resp.data)

});