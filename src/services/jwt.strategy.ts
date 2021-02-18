import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DoctorEntity } from "src/entities/doctor.entity";
import { UserEntity } from "src/entities/user.entity";
import { AuthPayload } from "src/models/user.model";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(DoctorEntity) private doctorRepo: Repository<DoctorEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: 'AloUsHSecretKEY'
        });
    }

    async validate(payload: AuthPayload) {
        const {username} = payload;
        console.log('Payload', payload);
        const user = await this.userRepo.find({where: {username}});
        console.log('User', user);
        if (user.length < 1) {
            console.log('Not User');
            const doctor = await this.doctorRepo.findOne({where: {username}})
            console.log('Doctor', doctor);
            if (!doctor) {
                console.log('Not doctor');
                throw new UnauthorizedException();
            }
            return doctor;
        }
        return user;
    }

}