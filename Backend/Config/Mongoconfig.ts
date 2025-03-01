import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config(); 

export class MongoConfig {
    private static dbConnection: Db | null = null;
    private static client: MongoClient | null = null;

    public static async getDBConnection(): Promise<Db> {
        if (MongoConfig.dbConnection) {
            return MongoConfig.dbConnection;
        }
//process.env.COSMOS_DB_CONNECTION_STRING ||
//process.env.COSMOS_DB_NAME ||
        const cosmosDbConnectionString = process.env.DB_CONNECTION_STRING ||  `mongodb://guessgame:Assignment%40123@cluster0-shard-00-00.lg29j.mongodb.net:27017,cluster0-shard-00-01.lg29j.mongodb.net:27017,cluster0-shard-00-02.lg29j.mongodb.net:27017/?ssl=true&replicaSet=atlas-132az8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
        const cosmosDbName = process.env.DB_NAME ||  "guessgame";

        if (!cosmosDbConnectionString || !cosmosDbName) {
            throw new Error("Database connection string or name is missing.");
        }

        try {
            MongoConfig.client = new MongoClient(cosmosDbConnectionString);
            await MongoConfig.client.connect();

            MongoConfig.dbConnection = MongoConfig.client.db(cosmosDbName);
            console.log("Connected to MongoDB");

            return MongoConfig.dbConnection;
        } catch (error) {
            console.error(" MongoDB Connection Error:", error);
            throw new Error("Failed to connect to MongoDB");
        }
    }

    public static async closeConnection(): Promise<void> {
        if (MongoConfig.client) {
            await MongoConfig.client.close();
            MongoConfig.dbConnection = null;
            MongoConfig.client = null;
            console.log("MongoDB connection closed");
        }
    }
}
