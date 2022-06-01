// we import express to add types to the request/response objects from our controller functions
import express from "express";

// we import our newly created user services

// we import the argon2 library for password hashing
import argon2 from "argon2";
import usersServices from "../services/services";

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersServices.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersServices.readById(req.body.id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const user = await usersServices.create(req.body);
    res.status(201).send({ user });
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    res.status(204).send();
  }
}

export default new UsersController();
