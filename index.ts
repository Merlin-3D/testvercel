import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./src/common/route-config";
import { UsersRoutes } from "./src/common/user-route";
import ORMConfig from "./src/common/db/connect";
import { AppDataSource } from "./src/utils/data-source";
import validateEnv from "./src/utils/validateEnv";

const routes: Array<CommonRoutesConfig> = [];

AppDataSource.initialize()
  .then(async () => {
    // validateEnv();
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.use(cors());

    const loggerOptions: expressWinston.LoggerOptions = {
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
      ),
    };

    if (!process.env.DEBUG) {
      loggerOptions.meta = false;
    }

    app.use(expressWinston.logger(loggerOptions));

    routes.push(new UsersRoutes(app));

    app.get("/", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server + Typeorm");
    });

    app.listen(port, () => {
      routes.forEach((route: CommonRoutesConfig) => {});
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
