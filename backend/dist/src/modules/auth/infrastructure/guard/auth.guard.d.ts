import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseAuthService } from '../adapter/out/supabase-auth.service';
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare class AuthGuard implements CanActivate {
    private readonly supabaseAuthService;
    private readonly reflector;
    constructor(supabaseAuthService: SupabaseAuthService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
