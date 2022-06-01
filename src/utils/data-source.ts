require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import config from "config";
import { User } from "../entity/User";

const isCompiled = path.extname(__filename).includes("js");

// const postgresConfig = config.get<{
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
// }>("postgresConfig");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "root",
  database: process.env.POSTGRES_DB || "stock_db",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  entities: [User],
  migrations: ["../migration/**/*.ts"],
  subscribers: ["../subscriber/**/*.ts"],
});
