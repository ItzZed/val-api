import { API } from '../..';
import { Regions } from "../regions";
import { Locale } from '../../types/alias';
import { ContentDto } from '../../types/valorant/VAL-CONTENT-V1';

const axios = require("axios");
const { regions } = require("../regions");

export class ContentV1 {

	/**
	 * Fetch ALL content that valorant provides!
	 *
	 * @description Get content optionally filtered by locale
	 *
	 * @remark
	 * **`Requires Development API Key`**
	 *
	 * @returns A promise containing the ContentV1 API Response: `{@link ContentDTo}`
	 *
	 * {@link https://developer.riotgames.com/apis#val-content-v1/GET_getContent Reference of VAL-CONTENT-V1}
	 */

	getValContent(region = Regions.NA, locale?: Locale) {

		axios.get(`https://${this.region}.api.riotgames.com/val/content/v1/contents?locale=${this.locale}&api_key=${this.apikey}`).then(resp => {

			console.log(resp.data)

		});

	}


}