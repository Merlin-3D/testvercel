export interface UserRequestDto {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  permissionLevel?: number;
}
