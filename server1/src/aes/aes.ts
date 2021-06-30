const aes256 = require('aes256');
import {config} from "../../../shared/config";

export class AES{
    private static chiper: any = aes256.createCipher(config.aes_key);

    public static encrypt(data: any): any{
        return this.chiper.encrypt(JSON.stringify(data));
    }

    public static decrypt(data: any): any{
        return JSON.parse(this.chiper.decrypt(data).toString());

    }
}
