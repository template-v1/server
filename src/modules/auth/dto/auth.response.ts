export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    contactNumber?: string;
  }
}

export class RegisterResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    contactNumber?: string;
  }
}

export class AutoLoginResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    contactNumber?: string;
    role?: string;
  }
}