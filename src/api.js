"use strict";

const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const querystring = require('querystring');
const tough = require('tough-cookie');
const url = require('url');

// get those regions
const regions = require('./regions');

axiosCookieJarSupport(axios);

class API {

    constructor(apikey, region = regions.NorthAmerica, locale = 'en-US') {

        this.apikey = apikey;
        this.region = region;
        this.locale = locale;
        this.username = null;
        this.user_id = null;
        this.access_token = null;
        this.entitlements_token = null;
        this.client_version = 'release-03.12-shipping-16-649370';
        this.client_platform = {
            "platformType": "PC",
            "platformOS": "Windows",
            "platformOSVersion": "10.0.19042.1.256.64bit",
            "platformChipset": "Unknown"
        };
    }

    authorize(username, password) {

        const jar = new tough.CookieJar();

        return axios.post('https://auth.riotgames.com/api/v1/authorization', {
            'client_id': 'play-valorant-web-prod',
            'nonce': '1',
            'redirect_uri': 'https://playvalorant.com/opt_in',
            'response_type': 'token id_token',
        },{
            jar: jar,
            withCredentials: true,
        }).then(() => {
            return axios.put('https://auth.riotgames.com/api/v1/authorization', {
                'type': 'auth',
                'username': username,
                'password': password,
            },{
                jar: jar,
                withCredentials: true,
            }).then((response) => {

                // check for error
                if(response.data.error){
                    throw new Error(response.data.error);
                }

                // parse uri
                let parsedUrl = url.parse(response.data.response.parameters.uri);

                // strip # from hash
                let hash = parsedUrl.hash.replace('#', '');

                // parse query string from hash
                let parts = querystring.parse(hash);

                // return access token
                return parts.access_token
            });
        }).then((access_token) => {
            return axios.post('https://entitlements.auth.riotgames.com/api/token/v1',{},{
                jar: cookieJar,
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            }).then((response) => {
                this.username = username;
                this.access_token = access_token;
                this.entitlements_token = response.data.entitlements_token;
            });
        }).then(() => {
            return axios.post('https://auth.riotgames.com/userinfo',{},{
                jar: cookieJar,
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${this.access_token}`,
                },
            }).then((response) => {
                this.user_id = response.data.sub;
            });
        });

    }

    
    getValContent(region) {

        axios.get(`https://${this.region}.api.riotgames.com/val/content/v1/contents?locale=${this.locale}&api_key=${this.apikey}`).then(resp => {

	        console.log(resp.data)

        });

    }

    getValRanked(region, actID, size = 200, startIndex = 0) {

        axios.get(`https://${this.region}.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actID}?size=${size}&startIndex=${startIndex}`).then(resp =>  {

            console.log(resp.data)

        });

    }

    getValStatus(region) {

        axios.get(`https://${this.region}.api.riotgames.com/val/status/v1/platform-data?api_key=${this.apikey}`).then(resp => {

	        console.log(resp.data)

    }); 

    }

}

module.exports = API;