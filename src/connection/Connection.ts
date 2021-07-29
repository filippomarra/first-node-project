import Power from "../entity/Power";
import SuperHero from "../entity/SuperHero";
import { createConnection } from "typeorm";

export const connection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Ry7!Z0ni!0",
    database: "first_node_db",
    entities: [
        // typeORM will not be able to create database table if we forget to put entity class name here.
        SuperHero, // our SuperHero entity class
        Power // our Power entity class
    ],
    synchronize: true,
    logging: false
});
