import { ExecutionContext, CanActivate, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; // Safely handle token extraction

        if (!token) {
            throw new Error('No authorization token provided');
        }

        const user = await this.authService.validateToken(token); // Assuming validateToken is a method in AuthService
        request.user = user; // Attach the validated user to the request object

        return true; // Proceed with the request if the token is valid
    }
}
