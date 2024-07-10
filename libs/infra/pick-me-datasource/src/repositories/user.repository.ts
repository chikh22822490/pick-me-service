import { InfrastructureException, UserRepository } from '@pick-me-core';

export class UserRepositoryImpl implements UserRepository {

  private async getServiceAccessToken(): Promise<string> {
    try {
      const tokenRequestParams = new URLSearchParams();
      tokenRequestParams.append('grant_type', 'client_credentials');
      tokenRequestParams.append(
        'client_id',
        process.env.KEYCLOAK_SERVICE_CLIENT_ID
      );
      tokenRequestParams.append(
        'client_secret',
        process.env.KEYCLOAK_SERVICE_CLIENT_SECRET
      );
      const tokenRequestResponse = await fetch(
        `${process.env.KEYCLOAK_ENDPOINT}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: tokenRequestParams,
        }
      );
      const body = await tokenRequestResponse.json();
      const token = body.access_token;
      return token;
    } catch (error) {
      throw new InfrastructureException();
    }
  }

  async updateUserInfo(
    userId: string,
    firstName: string,
    lastName: string,
    email: string
  ) {
    try {
      const token = await this.getServiceAccessToken();
      const response = await fetch(
        `${process.env.KEYCLOAK_ENDPOINT}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
          }),
        }
      );
      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new InfrastructureException(errorMessage);
      }
    } catch (error) {
      if (error instanceof InfrastructureException) {
        throw error;
      } else throw new InfrastructureException(error);
    }
  }

  async updateUserCredentials(
    userId: string,
    newPassword: string
  ): Promise<void> {
    try {
      const token = await this.getServiceAccessToken();
      const response = await fetch(
        `${process.env.KEYCLOAK_ENDPOINT}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}/reset-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'password',
            value: newPassword,
            temporary: false,
          }),
        }
      );
      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new InfrastructureException(errorMessage);
      }
    } catch (error) {
      if (error instanceof InfrastructureException) {
        throw error;
      } else throw new InfrastructureException(error);
    }
  }

  async enableUser(userId: string): Promise<void> {
    try {
      const token = await this.getServiceAccessToken();
      const response = await fetch(
        `${process.env.KEYCLOAK_ENDPOINT}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            enabled: 'true',
          }),
        }
      );
      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new InfrastructureException(errorMessage);
      }
    } catch (error) {
      throw new InfrastructureException(error);
    }
  }

  async disableUser(userId: string): Promise<void> {
    try {
      const token = await this.getServiceAccessToken();
      const response = await fetch(
        `${process.env.KEYCLOAK_ENDPOINT}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            enabled: 'false',
          }),
        }
      );
      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new InfrastructureException(errorMessage);
      }
    } catch (error) {
      throw new InfrastructureException(error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const token = await this.getServiceAccessToken();
      const response = await fetch(
        `${process.env.KEYCLOAK_ENDPOINT}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new InfrastructureException(errorMessage);
      }
    } catch (error) {
      throw new InfrastructureException(error);
    }
  }
}
