"use strict";

const axios = require('axios').default;
// const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const querystring = require('querystring');
const tough = require('tough-cookie');
const url = require('url');

// get those regions
const regions = require('./regions');

// axiosCookieJarSupport(axios);

class API {

    constructor(apikey, region = regions.NorthAmerica, locale = 'en-US') {

        this.apikey = apikey;
        this.region = region;
        this.locale = locale;
        /*this.username = null;
        this.user_id = null;
        this.access_token = null;
        this.entitlements_token = null;
        this.client_version = 'release-03.00-shipping-22-574489';
        this.client_platform = {
            "platformType": "PC",
            "platformOS": "Windows",
            "platformOSVersion": "10.0.19042.1.256.64bit",
            "platformChipset": "Unknown"
        };*/
    }

    
    getValContent(region) {

        axios.get(`https://${this.region}.api.riotgames.com/val/content/v1/contents?locale=${this.locale}&api_key=${this.apikey}`).then(resp => {

	        console.log(resp.data)

        });

    }

    getValStatus(region) {

        axios.get(`https://na.api.riotgames.com/val/status/v1/platform-data?api_key=${apikey}`).then(resp => {

	        console.log(resp.data)

    }); 

    }

}

module.exports = API;