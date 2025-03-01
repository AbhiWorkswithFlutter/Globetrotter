import { Db } from 'mongodb';
export declare class MongoConfig {
    private static dbConnection;
    private static client;
    static getDBConnection(): Promise<Db>;
    static closeConnection(): Promise<void>;
}
