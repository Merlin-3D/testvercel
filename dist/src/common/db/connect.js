"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const isCompiled = path_1.default.extname(__filename).includes("js");
exports.default = {
    type: "postgres",
    host: "ec2-54-227-248-71.compute-1.amazonaws.com",
    port: 5432,
    username: "tmunfslmykqhoh",
    password: "b942197d0bd443d5f5546de53179b0bbda07e24ccbd02e17c04344fcb17e93d4",
    database: "de5a878l6dmqj8",
    synchronize: true,
    logging: true,
    entities: [`database/entity/**/*.${isCompiled ? "js" : "ts"}`],
    migrations: [`database/migration/**/*.${isCompiled ? "js" : "ts"}`],
    cli: {
        entitiesDir: "database/entity",
        migrationsDir: "database/migration",
    },
};
