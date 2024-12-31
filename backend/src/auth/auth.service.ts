import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    
    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findByName(username);

        const isMatch = await bcrypt.compare(pass, user.password); // compara senha fornecida com a do banco

        if (!isMatch){ 
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.name };

        return {
          access_token: await this.jwtService.signAsync(payload),
        };

    }



}
