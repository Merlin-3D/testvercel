import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./src/common/route-config";
import { UsersRoutes } from "./src/common/user-route";
import ORMConfig from "./src/common/db/connect";
import { createConnection } from "typeorm";

const routes: Array<CommonRoutesConfig> = [];

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// createConnection(ORMConfig);
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// const loggerOptions: expressWinston.LoggerOptions = {
//   transports: [new winston.transports.Console()],
//   format: winston.format.combine(
//     winston.format.json(),
//     winston.format.prettyPrint(),
//     winston.format.colorize({ all: true })
//   ),
// };

// if (!process.env.DEBUG) {
//   loggerOptions.meta = false; // when not debugging, log requests as one-liners
// }

// app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,

// this is a simple route to make sure everything is working properly
// routes.push(new UsersRoutes(app));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server + Typeorm");
});

// routes.forEach((route: CommonRoutesConfig) => {
//   // debugLog(`Routes configured for ${route.getName()}`);
// });
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
