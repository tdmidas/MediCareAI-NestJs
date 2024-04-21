import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    private readonly logger = new Logger(AuthorizationGuard.name);

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.isAdmin) {
            this.logger.warn('Unauthorized access: User is not an admin');
            return false;
        }

        return true;
    }
}
