import { HttpException } from '@exceptions/HttpException';
import axios from 'axios';
import { logger } from '@utils/logger';

export enum MIXPANEL_REGIONS {
  US = 'US',
  EU = 'EU',
}

class MixpanelService {
  private token = null;
  private region: string = '';

  constructor(token: string, region: string) {
    this.token = token;
    this.region = region;
  }

  public async track(event) {
    try {
      const url = this.region.toUpperCase() === MIXPANEL_REGIONS.US ? 'https://api.mixpanel.com/track' : 'https://api-eu.mixpanel.com/track';
      if (!event.properties) event.properties = {};
      event.properties.token = this.token;
      logger.info('Send data to Mixpanel: ' + JSON.stringify(event));
      const result = await axios.get(url, {
        params: {
          verbose: 1,
          data: JSON.stringify(event),
        },
      });
      return result.data;
    } catch (error) {
      logger.error(error);
      throw new HttpException(500, 'Can not send data to amplitude');
    }
  }
}

export default MixpanelService;
