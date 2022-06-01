"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const route_config_1 = require("./route-config");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const users_middleware_1 = __importDefault(require("../middlewares/users.middleware"));
class UsersRoutes extends route_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UsersRoutes");
    }
    configureRoutes() {
        this.app.route(`/users`).get(user_controller_1.default.listUsers).post(
        // usersMiddleware.validateRequiredUserBodyFields,
        // usersMiddleware.validateSameEmailDoesntExist,
        user_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists)
            .get(user_controller_1.default.getUserById)
            .delete(user_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            users_middleware_1.default.validateRequiredUserBodyFields,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            user_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            users_middleware_1.default.validatePatchEmail,
            user_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
