import { ImageModel } from "../";

export default class Media {
    static get(media: ImageModel): string {
        return API_URL + media.url;
    }
}

const API_URL = process.env.API_URL;