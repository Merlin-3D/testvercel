"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./src/common/user-route");
const connect_1 = __importDefault(require("./src/common/db/connect"));
const typeorm_1 = require("typeorm");
const routes = [];
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, typeorm_1.createConnection)(connect_1.default);
app.use(express_1.default.json());
// here we are adding middleware to allow cross-origin requests
app.use((0, cors_1.default)());
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
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + Typeorm");
});
routes.push(new user_route_1.UsersRoutes(app));
app.listen(port, () => {
    routes.forEach((route) => {
        // debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
