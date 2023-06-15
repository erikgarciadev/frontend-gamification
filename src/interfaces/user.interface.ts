export interface IUser {
  _id: string;
  firstname?: string;
  image_url?: string;
  username: string;
  coins?: number;
  points?: number;
  role: {
    value: string;
  };
}
