import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO, LoginOTP, RegisterationOTP, RegistrationDTO } from 'src/models/user.model';
import { AuthService } from '../../services/auth.service';

@Controller('users')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/refreshtoken')
    refreshToken(@Body() body: {username: string}) {
      return this.authService.refreshToken(body.username);
    }

    @Post()
    register(@Body(ValidationPipe) credentials: RegisterationOTP) {
       let regCred: RegistrationDTO = {
          email: credentials.username + "@myclinic.com",
          password: credentials.username,
          username: credentials.username
       };
       return this.authService.register(regCred);
    }

    @Post('/login')
    login(@Body() credentials: LoginOTP) {
       console.log("Login: ", credentials);
       let loginCred: LoginDTO = {
         email: credentials.username ,
         password: credentials.username
       }
       return this.authService.login(loginCred);
    }

    @Post('/verify')
    async verify(@Body() body: {username: string, phoneNumber: string, code: string}) {
      console.log(body);
      if (body.username === undefined) {
         body.username = body.phoneNumber;
      }
      return await this.authService.verify(body.username, body.code);
    }

    @Post('/doctor/login')
    loginDoctor(@Body() credentials: LoginOTP) {
       let loginCred: LoginDTO = {
         email: credentials.username + "@myclinic.com",
         password: credentials.username
       }
       return this.authService.loginDoctor(loginCred);
    }

    @Post('/doctors')
    registerDoctor(@Body(ValidationPipe) credentials: RegisterationOTP) {
      let regCred: RegistrationDTO = {
         email: credentials.username + "@myclinic.com",
         password: credentials.username,
         username: credentials.username
      };
      return this.authService.registerDoctor(regCred);
    }

    @Delete('/delete/user')
    deleteUser(@Body() body: {username: string}) {
       return this.authService.deleteUser(body.username);
    }



}
