import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthentificationService } from "../authentification.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthentificationService,
        private jwtService: JwtService
    ) {}


    async canActivate(context: ExecutionContext): Promise<boolean>  {
       const request = context.switchToHttp().getRequest();
       const token = this.extractTokenFromHeader(request);
       console.log(token);
       if(!token) {
        return false;
       }

       try {
        
        const payload = await this.jwtService.verifyAsync(token);

        const caissier = await this.authService.getCaissierByEmailCaissier(payload.sub)

        request.user = caissier;

       } catch {
        return false;
       }

       return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        console.log("Ato am extraction an'ilay token ary ve ny olana ??");
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log(type);
        return type === 'Bearer' ? token : undefined;
    }
}