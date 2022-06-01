"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const isCompiled = path_1.default.extname(__filename).includes("js");
exports.default = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "stock_db",
    synchronize: !process.env.DB_NO_SYNC,
    logging: !process.env.DB_NO_LOGS,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
    entities: [`database/entity/**/*.${isCompiled ? "js" : "ts"}`],
    migrations: [`database/migration/**/*.${isCompiled ? "js" : "ts"}`],
    cli: {
        entitiesDir: "database/entity",
        migrationsDir: "database/migration",
    },
};
