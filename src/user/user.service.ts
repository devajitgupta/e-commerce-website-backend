import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/common/dtos/user.dto/create-user.dto';
import { Users, UsersDocument } from 'src/common/schemas/users.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/common/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<UsersDocument | null> {
    const newUser = await new this.usersModel(createUserDto);
    return newUser.save();
  }
  async UpdateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    return await this.usersModel.findByIdAndUpdate(id, UpdateUserDto);
  }

  async getAllUsers() {
    const UserData = await this.usersModel.find().exec();
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UserData;
  }

  async getUserById(id) {
    return await this.usersModel.findById(id);
  }

  async removeUser(id: string) {
    return await this.usersModel.findByIdAndRemove(id);
  }
  async findOneWithPassword(username: string): Promise<UsersDocument | null> {
    return await this.usersModel
      .findOne({ username: username })
      .select(['password', 'username']);
  }
  async updatePassword(
    _id: string,
    password: string,
  ): Promise<UsersDocument | null> {
    let user = await this.getUserById(_id);
    user.password = password;
    return await user.save();
  }
  async getUserByUsername(username: string) {
    return await this.usersModel.findOne({
      username,
    });
  }
}
