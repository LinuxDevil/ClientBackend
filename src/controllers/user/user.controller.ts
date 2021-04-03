import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { UserService } from '../../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { username }: UserEntity) {
    return this.userService.findByUsername(username);
  }

  @Get('/current')
  @UseGuards(AuthGuard())
  getUser(@User() user: UserEntity) {
    if (user === undefined) {
      return new UnauthorizedException('No user');
    }
    return user === null ? { message: 'No User', status: 0 } : { user };
  }

  @Put()
  @UseGuards(AuthGuard())
  update(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateUserDTO,
  ) {
    return this.userService.updateUser(username, data);
  }

  @Post('/addSub')
  @UseGuards(AuthGuard())
  addSubUser(
    @User() user: UserEntity,
    @Body() subUsername: { username: string; subUsername: string },
  ) {
    return this.userService.addSubUser(user, subUsername);
  }
}
