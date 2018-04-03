import { DevConfig } from './dev.config';
import { ProdConfig } from './prod.config';

export enum ServerEnvironment {
    PROD,
    DEV
}

export interface ConfigInterface {
    DB: {
        Url: string;
    };
    Session: {
        MaxAge: number;
        Secret: string;
    };
    Cache: {
        MaxAge: number;
    };
    Port: number;
    SSL?: {
        Key: string;
        Cert: string;
    }
}

export class CfgLoader {
    constructor (
        private readonly env: ServerEnvironment,
        private readonly https?: boolean
    ) {
    }

    public load () {
        if (!this.https) {
            ProdConfig.Port = 80;
        } else {
            ProdConfig.Port = 443;
        }
        return this.env === ServerEnvironment.PROD ? ProdConfig : DevConfig;
    }
}