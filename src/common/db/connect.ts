import { DataSourceOptions } from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename).includes("js");

export default {
  type: "postgres",
  host: "ec2-54-227-248-71.compute-1.amazonaws.com" || "localhost",
  port: 5432,
  username: "tmunfslmykqhoh" || "postgres",
  password:
    "b942197d0bd443d5f5546de53179b0bbda07e24ccbd02e17c04344fcb17e93d4" ||
    "root",
  database: "de5a878l6dmqj8" || "stock_db",
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
} as DataSourceOptions;
