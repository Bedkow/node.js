import { EntityRepository } from "@mikro-orm/core";
import { UserEntity } from "../entities/user.entity.ts";

export class UsersRepository extends EntityRepository<UserEntity> {
  async getAllUsers(): Promise<UserEntity[] | []> {
    return await this.findAll();
  }
}