import { Request, Response } from 'express';
import { AuthService } from '../../../application/usecase/auth.service';
import { LoginDto } from '../../../application/dto/login.dto';
import { RegisterDto } from '../../../application/dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, response: Response): Promise<import("../../../application/dto/auth-response.dto").AuthResponseDto>;
    login(dto: LoginDto, response: Response): Promise<import("../../../application/dto/auth-response.dto").AuthResponseDto>;
    logout(request: Request, response: Response): Promise<{
        message: string;
    }>;
    getCurrentUser(request: Request): Promise<{
        id: string;
        email: string;
        firstName: any;
        lastName: any;
    }>;
    googleAuth(response: Response): Promise<void>;
    googleCallback(code: string, response: Response): Promise<void>;
}
