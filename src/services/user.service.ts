import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/services/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';
import { Constants } from 'src/helpers/Constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(InsuranceCompanyEntity)
    private insuranceRepo: Repository<InsuranceCompanyEntity>,
    private auth: AuthService,
  ) {}

  async findByUsername(username: string, user?: UserEntity) {
    try {
      return (
        await this.userRepo.findOne({
          where: { username },
          relations: ['followers'],
        })
      ).toProfile(user);
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async updateUser(username: string, data: UpdateUserDTO) {
    try {
      const user = await this.userRepo.findOne({
        where: { username },
        loadRelationIds: true,
      });
      if (
        data.insuranceCompanyId !== null &&
        data.insuranceCompanyId !== undefined
      ) {
        const insurance = await this.insuranceRepo.findOne({
          where: { id: +data.insuranceCompanyId },
        });
        if (insurance === null || insurance === undefined) {
          return {
            status: 0,
            message: 'There is no insurance with id' + data.insuranceCompanyId,
          };
        }
        user.insuranceCompany = insurance;
        await user.save();
        await delete data.insuranceCompanyId;
      }
      await this.userRepo.update({ username }, data);
      return { user, status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async followUser(currentUser: UserEntity, username: string) {
    try {
      const user = await this.userRepo.findOne({
        where: { username },
        loadRelationIds: true,
      });
      user.followers.push(currentUser);
      await user.save();
      const userF = user.toProfile(currentUser);
      return {
        user: userF,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async unfollowUser(currentUser: UserEntity, username: string) {
    try {
      const user = await this.userRepo.findOne({
        where: { username },
        loadRelationIds: true,
      });
      user.followers = user.followers.filter(
        (follower) => follower != currentUser,
      );
      await user.save();
      const userProfile = user.toProfile(currentUser);
      return {
        user: userProfile,
        status: new Constants().PREMADE_STATUS.SUCCESS_GET,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }

  async addSubUser(
    currentUser: UserEntity,
    username: { username: string; subUsername: string },
  ) {
    try {
      // Do register a new user, so just create the regular registration method here
      const newUser = await this.auth.register({
        email: username.subUsername + '@myclinic.com',
        password: username.subUsername,
        username: username.subUsername,
      });
      console.log(newUser);
      console.log(username);
      const user = await this.userRepo.findOne({
        where: { username: username.subUsername },
        loadRelationIds: true,
      });
      if (currentUser.subUsers === undefined) currentUser.subUsers = [];
      currentUser.subUsers.push(user);
      await currentUser.save();
      return {
        user: currentUser,
        status: new Constants().PREMADE_STATUS.SUCCESS_UPDATED,
      };
    } catch (error) {
      return {
        status: new Constants().PREMADE_STATUS.Fail_GET,
        error,
      };
    }
  }
}
