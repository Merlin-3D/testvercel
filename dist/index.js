"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./src/common/user-route");
const data_source_1 = require("./src/utils/data-source");
const routes = [];
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // validateEnv();
    dotenv_1.default.config();
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3000;
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    const loggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
    };
    if (!process.env.DEBUG) {
        loggerOptions.meta = false;
    }
    app.use(expressWinston.logger(loggerOptions));
    routes.push(new user_route_1.UsersRoutes(app));
    app.get("/", (req, res) => {
        res.send("Express + TypeScript Server + Typeorm");
    });
    app.listen(port, () => {
        routes.forEach((route) => { });
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}))
    .catch((error) => console.log(error));
