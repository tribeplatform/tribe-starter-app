import userModel from '@models/users.model';
import { TribeClient } from '@tribeplatform/gql-client';
import { logger } from '@utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { CLIENT_ID, CLIENT_SECRET, NETWORK_ID, MEMBER_ID, GRAPHQL_URL } from '@config';

class ClientService {
  private tribeClient: TribeClient = null;
  private accessToken = null;
  private users = userModel;

  constructor() {
    this.initTribeClient();
  }

  private async initTribeClient() {
    await this.genrateTribeClientInstance();
    await this.setAccessToken();
  }

  private genrateTribeClientInstance() {
    if (this.tribeClient === null) {
      this.tribeClient = new TribeClient({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        graphqlUrl: GRAPHQL_URL,
      });
    }
  }

  private async setAccessToken() {
    try {
      this.accessToken = await this.tribeClient.generateToken({
        networkId: NETWORK_ID,
        memberId: MEMBER_ID,
      });
    } catch (error) {
      logger.error(error);
      throw new HttpException(500, 'Can not genrate Tribe Access token');
    }
  }

  public async getMemberByID(id) {
    try {
      const userInfo = await this.tribeClient.members.get(id, 'all', this.accessToken);
      await this.users.findOneAndUpdate(
        { name: userInfo.name },
        {
          $setOnInsert: {
            name: userInfo.name,
          },
        },
        { upsert: true },
      );
      return userInfo;
    } catch (error) {
      logger.error(error);
      throw new HttpException(500, 'Can not get user info');
    }
  }
}

export default ClientService;
