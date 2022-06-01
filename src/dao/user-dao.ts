import { DataSource, EntityManager } from "typeorm";
import { UserRequestDto } from "../dto/user-dto";
import { User } from "../entity/User";
import { AppDataSource } from "../utils/data-source";

class UsersDao {
  users: Array<UserRequestDto> = [];
  appData: EntityManager = AppDataSource.manager;
  constructor() {}

  async addUser(userFields: UserRequestDto) {
    const user = new User();
    user.email = userFields.email!;
    user.name = userFields.name!;
    user.password = userFields.password!;
    await this.appData.save(user);
    return user;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  async putUserById(userId: string, user: UserRequestDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1, user);
    return `${user.id} updated va put`;
  }

  async patchUserById(userId: string, user: UserRequestDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
      "password",
      "firstName",
      "lastName",
      "permissionLevel",
    ];
    for (let field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;
  }

  async removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex(
      (obj: { email: string }) => obj.email === email
    );
    let currentUser = this.users[objIndex];
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }
}

export default new UsersDao();
