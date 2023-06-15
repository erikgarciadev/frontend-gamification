export interface IFormLogin {
  username: string;
  password: string;
}

export interface IFormRegister extends IFormLogin {
  password_repeat: string;
  gender?: "M" | "F" | null;
  name?: string;
}
