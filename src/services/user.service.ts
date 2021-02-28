import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/services/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { InsuranceCompanyEntity } from 'src/entities/insurance.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(InsuranceCompanyEntity) private insuranceRepo: Repository<InsuranceCompanyEntity>,
        private auth: AuthService) { }


    async findByUsername(username: string, user?: UserEntity): Promise<UserEntity> {
        return (await this.userRepo.findOne({ where: { username }, relations: ['followers'] })).toProfile(user);
    }

    async updateUser(username: string, data: UpdateUserDTO) {
        let user = await this.userRepo.findOne({where: {username}});
        if (data.insuranceCompanyId !== null && data.insuranceCompanyId !== undefined) {
            let insurance = await this.insuranceRepo.findOne({where: {id: +data.insuranceCompanyId}});
            if (insurance === null || insurance === undefined) {
                return {
                    status: 0,
                    message: 'There is no insurance with id' + data.insuranceCompanyId
                }
            }
            user.insuranceCompany = insurance;
            await user.save();
            await delete data.insuranceCompanyId;
        }
        await this.userRepo.update({ username }, data);
        return user;
    }

    async followUser(currentUser: UserEntity, username: string) {
        const user = await this.userRepo.findOne({ where: { username }, relations: ['followers'] });
        user.followers.push(currentUser);
        await user.save();
        return user.toProfile(currentUser);
    }

    async unfollowUser(currentUser: UserEntity, username: string) {
        const user = await this.userRepo.findOne({ where: { username }, relations: ['followers'] });
        user.followers = user.followers.filter(follower => follower != currentUser);
        await user.save();
        return user.toProfile(currentUser);
    }

    async addSubUser(currentUser: UserEntity, username: {username: string; subUsername: string}) {
        // Do register a new user, so just create the regular registration method here
        const newUser = await this.auth.register({
            email: username.subUsername + "@myclinic.com",
            password: username.subUsername,
            username: username.subUsername
        });
        console.log(newUser);
        console.log(username);
        const user = await this.userRepo.findOne({where: {username: username.subUsername}});
        if (currentUser.subUsers === undefined) 
            currentUser.subUsers = [];
        currentUser.subUsers.push(user);
        await currentUser.save();
        return currentUser;
    }

}
