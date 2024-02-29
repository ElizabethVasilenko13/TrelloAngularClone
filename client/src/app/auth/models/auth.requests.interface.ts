export interface RegisterRequestInterface {
  email: string;
  username?: string;
  password: string;
}

export interface LoginRequestInterface {
  email: string;
  password: string;
}
