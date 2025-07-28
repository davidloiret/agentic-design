export class AuthResponseDto {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  access_token: string;
  refresh_token?: string;
}