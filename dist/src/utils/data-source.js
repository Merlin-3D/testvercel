"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv").config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const User_1 = require("../entity/User");
const isCompiled = path_1.default.extname(__filename).includes("js");
// const postgresConfig = config.get<{
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
// }>("postgresConfig");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "root",
    database: process.env.POSTGRES_DB || "stock_db",
    synchronize: !process.env.DB_NO_SYNC,
    logging: !process.env.DB_NO_LOGS,
    entities: [User_1.User],
    migrations: ["../migration/**/*.ts"],
    subscribers: ["../subscriber/**/*.ts"],
});
