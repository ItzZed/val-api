// REMINDER THIS IS A PROJECT THAT IS IN DEVELOPMENT
// THIS IS A TEST APP TO TRY TO GET THE API WORKING

// some code is from valorant.js I will redo those sections but I needed a base template :)
/*
module.exports = {

    API: require("./src/api"),
    Maps: require("./src/maps"),
	Regions: require("./src/regions"),
	
};*/

const axios = require('axios');
const fs = require('fs');
const API = require('./src/api.js');

// GET API KEY HERE
const config = require('./config.json');
const { Console } = require('console');
const apikey = config.apikey;
/*
// test get, replace api key
axios.get(`https://na.api.riotgames.com/val/status/v1/platform-data?api_key=${apikey}`).then(resp => {

	console.log(resp.data)

});*/


const vapi = new API(apikey);


try {

    // vapi.getValStatus();
    // vapi.getValRanked('a16955a5-4ad0-f761-5e9e-389df1c892fb');

}
catch(err) {

    console.log("I AAM HERE")
    if(err.status === 403)  {

        console.log("ASHAFJASHFAJF");
        alert("ERROR 403");
        alert("API key most likely incorrect");

    }
    console.log(err)

}

