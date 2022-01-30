"use strict";

// get those regions
import { Region } from '../types/region';
import { Regions } from './Regions';

class API {

    constructor(region = regions.NorthAmerica) {

        this.region = region;
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


    // Get VAL Content from VAL-CONTENET
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


        /*generateRequestHeaders(extraHeaders = {}) {

			// generate default headers
			const defaultHeaders = {
				'Authorization': `Bearer ${this.access_token}`,
				'X-Riot-Entitlements-JWT': this.entitlements_token,
				'X-Riot-ClientVersion': this.client_version,
				'X-Riot-ClientPlatform': Buffer.from(JSON.stringify(this.client_platform)).toString('base64'),
			};

			// merge in extra headers
			return {
				...defaultHeaders,
				...extraHeaders,
			}

		}

		authorize(username, password) {

			const cookieJar = new tough.CookieJar();

			return axios.post('https://auth.riotgames.com/api/v1/authorization', {
				'client_id': 'play-valorant-web-prod',
				'nonce': '1',
				'redirect_uri': 'https://playvalorant.com/opt_in',
				'response_type': 'token id_token',
			},{
				jar: cookieJar,
				withCredentials: true,
			}).then(() => {
				return axios.put('https://auth.riotgames.com/api/v1/authorization', {
					'type': 'auth',
					'username': username,
					'password': password,
				},{
					jar: cookieJar,
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

		}*/

}

module.exports = API;