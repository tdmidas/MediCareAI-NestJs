import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    private readonly logger = new Logger(AuthenticationGuard.name);

    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            this.logger.warn('Unauthorized access: Missing or invalid authentication header');
            return false;
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            request.user = decodedToken;

            return true;
        } catch (error) {
            this.logger.warn('Unauthorized access: Invalid token');
            return false;
        }
    }
}
