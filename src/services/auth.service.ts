import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/entities/doctor.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegistrationDTO } from 'src/models/user.model';
import { SmsService } from 'src/services/sms.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>,
        private jwtService: JwtService,
        private smsService: SmsService
    ) { }

    async deleteUser(username: string) {
        let user = await this.userRepo.findOne({where:  {username}});
        await this.userRepo.delete(user.id);
        return user;
    }

    async verify(username: string, code: string) {
        console.log('verify', username);
        let response = await this.smsService.checkVerification(username, code);
        if (response === 'approved') {
            await this.smsService.sendSMS(username, "Hello, Welcome to My Clinic App");
            return {
                message: 'Approved!',
                status: 1
            }
        } else {
            return {
                message: 'Wrong Code',
                status: 0
            }
        }
    }

    async register(credentials: RegistrationDTO) {
        try {
            const user = this.userRepo.create(credentials);
            console.log("GOt user", credentials);
            await user.save();
            const payload = { username: user.username };
            console.log("payload", payload);
            await this.smsService.sendVerification(user.username);
            const token = this.jwtService.sign(payload);
            return { user: { ...user.toJSON(), token } };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username has already been taken');
            }
            return new InternalServerErrorException()
        }
    }

    async login(credentials: LoginDTO) {
        try {
            const user = await this.userRepo.findOne({ where: { username: credentials.email } });
            const isValid = await user.comparePassword(credentials.password);
            if (!isValid) {
                throw new Error()
            }
            await this.smsService.sendVerification(user.username);
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return { user: { ...user.toJSON(), token } };
        } catch (error) {
            throw new UnauthorizedException("Invalid Credintials")
        }
    }

    async registerDoctor(credentials: RegistrationDTO) {
        try {
            const user = this.doctorRepo.create(credentials);
            await user.save();
            const payload = { username: user.username };
            await this.smsService.sendVerification(user.username);
            const token = this.jwtService.sign(payload);
            return { doctor: { ...user.toJSON(), token } };
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username has already been taken');
            }
            return new InternalServerErrorException()
        }
    }

    async loginDoctor(credentials: LoginDTO) {
        try {
            const user = await this.doctorRepo.findOne({ where: { username: credentials.password } });
            const isValid = await user.comparePassword(credentials.password);
            if (!isValid) {
                throw new Error()
            }
            await this.smsService.sendVerification(user.username);
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return { doctor: { ...user.toJSON(), token } };
        } catch (error) {
            throw new UnauthorizedException("Invalid Credintials")
        }
    }

    async refreshToken(username: string) {
        console.log(username);
        if (username === undefined) {
            let error =  new Error("Please provide a good username");
            return {
                error,
                status: 0
            }
        }
        const usernameToken = this.jwtService.decode(username);
        if (usernameToken === null) return  {
            message: "decoding failed",
            status: 0
        };
        console.log(usernameToken);
        const token = this.jwtService.sign({username: usernameToken['username']});
        console.log(token);
        return {
            token,
            status: 1
        };
    }

}
