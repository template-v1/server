export class LoginRequestDto {
  emailOrUsername: string;
  password: string;
}

export class RegisterRequestDto {
  name: string;
  email: string;
  username: string;
  password: string;
}

export class AutoLoginRequestDto {
}

export class CreateUserGuestDto {
  name?: string;
  email?: string;
  username?: string;
  contactNumber?: string;
}