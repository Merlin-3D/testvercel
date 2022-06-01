import { CommonRoutesConfig } from "./route-config";
import express from "express";
import usersController from "../controllers/user-controller";
import usersMiddleware from "../middlewares/users.middleware";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route(`/users`).get(usersController.listUsers).post(
      // usersMiddleware.validateRequiredUserBodyFields,
      // usersMiddleware.validateSameEmailDoesntExist,
      usersController.createUser
    );

    this.app.param(`userId`, usersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(usersMiddleware.validateUserExists)
      .get(usersController.getUserById)
      .delete(usersController.removeUser);

    this.app.put(`/users/:userId`, [
      usersMiddleware.validateRequiredUserBodyFields,
      usersMiddleware.validateSameEmailBelongToSameUser,
      usersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      usersMiddleware.validatePatchEmail,
      usersController.patch,
    ]);

    return this.app;
  }
}
