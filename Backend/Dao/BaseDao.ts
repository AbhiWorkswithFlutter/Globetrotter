import { MongoConfig } from "../Config/Mongoconfig";


export class BaseDao {

    constructor(private collection: string) {

    }

    public async createuserDao(payload: any) {
        //mongo call to create user according to user schema 
        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).insertOne(payload);
            let newUser = await db.collection(this.collection).findOne({ _id: result.insertedId });

            // Return the full user object (including fields like username, profileIcon, etc.)
            return newUser;

        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async updateUserDao(query: any, payload: any) {
        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).updateOne(query, { $set: payload });
            return result;

        } catch (error) {
            console.log(error);
            return error
        }


    }

    public async getUserDao(userName: any) {
        console.log("aa", userName)

        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).find({ 'username': userName }).limit(1).toArray();
            console.log("result",result)
            return result;

        } catch (error) {
            console.log(error);
            return error
        }


    }

    public async createGameDao(payload: any) {

        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).insertOne(payload);
            return result;

        } catch (error) {
            console.log(error);
            return error
        }

    }

    public async getGameDataDao(payload: any) {

        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).find({ 'gameid': payload.gameid }).limit(1).toArray();
            return result;

        } catch (error) {
            console.log(error);
            return error
        }

    }

    public async getAllGameDataDao(payload: any) {

        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).find({ 'playerid': payload.userName }).toArray();
            return result;

        } catch (error) {
            console.log(error);
            return error
        }

    }

    public async updateUserGameScoreDao(query: any, payload: any) {
        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).updateOne(query, { $set: payload });
            return result;

        } catch (error) {
            console.log(error);
            return error
        }

    }

    public async updateHigestScoreDao(query: any, payload: any) {
        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection(this.collection).updateOne(query, { $set: payload });
            return result;

        } catch (error) {
            console.log(error);
            return error
        }

    }

    public async getQuestionDao(payload: any) {

        let db = await MongoConfig.getDBConnection();

        try {
            let result = await db.collection('destinations').find({ 'alias': payload.alias }).limit(1).toArray();
            return result;

        } catch (error) {
            console.log(error);
            return error
        }




    }








}