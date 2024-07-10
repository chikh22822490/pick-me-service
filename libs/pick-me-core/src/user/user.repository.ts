export interface UserRepository {
  updateUserCredentials(userId: string, newPassword: string): Promise<void>;
  updateUserInfo(
    userId: string,
    firstName: string,
    lastName: string,
    email: string
  ): Promise<void>;
}
