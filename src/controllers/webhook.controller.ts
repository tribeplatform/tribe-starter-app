import { NextFunction, Request, Response } from 'express';

import MixpanelService from '@/services/mixpanel.service';
import { Types } from '@tribeplatform/gql-client';
import { logger } from '@/utils/logger';

const DEFAULT_SETTINGS = {};

class WebhookController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    const input = req.body;
    try {
      if (input.data?.challenge) {
        return res.json({
          type: 'TEST',
          status: 'SUCCEEDED',
          data: {
            challenge: req.body?.data?.challenge,
          },
        });
      }
      let result: any = {
        type: input.type,
        status: 'SUCCEEDED',
        data: {},
      };

      switch (input.type) {
        case 'GET_SETTINGS':
          result = await this.getSettings(input);
          break;
        case 'UPDATE_SETTINGS':
          result = await this.updateSettings(input);
          break;
        case 'SUBSCRIPTION':
          result = await this.handleSubscription(input);
          break;
      }
      res.status(200).json(result);
    } catch (error) {
      logger.error(error);
      return {
        type: input.type,
        status: 'FAILED',
        data: {},
      };
    }
  };

  /**
   *
   * @param input
   * @returns { type: input.type, status: 'SUCCEEDED', data: {} }
   * TODO: Elaborate on this function
   */
  private async getSettings(input) {
    const currentSettings = input.currentSettings[0]?.settings || {};
    let defaultSettings;
    switch (input.context) {
      case Types.PermissionContext.NETWORK:
        defaultSettings = DEFAULT_SETTINGS;
        break;
      default:
        defaultSettings = {};
    }
    const settings = {
      ...defaultSettings,
      ...currentSettings,
    };
    return {
      type: input.type,
      status: 'SUCCEEDED',
      data: settings,
    };
  }

  /**
   *
   * @param input
   * @returns { type: input.type, status: 'SUCCEEDED', data: {} }
   * TODO: Elaborate on this function
   */
  private async updateSettings(input) {
    if (!input.data.settings?.apiKey) {
      return {
        type: input.type,
        status: 'FAILED',
        errorCode: 112,
        errorMessage: `Missing required parameter API key.`,
      };
    }
    if (!input.data.settings?.region) {
      return {
        type: input.type,
        status: 'FAILED',
        errorCode: 112,
        errorMessage: `Missing required parameter region.`,
      };
    }
    return {
      type: input.type,
      status: 'SUCCEEDED',
      data: { toStore: input.data.settings },
    };
  }

  /**
   *
   * @param input
   * @returns { type: input.type, status: 'SUCCEEDED', data: {} }
   * TODO: Elaborate on this function
   */
  private async handleSubscription(input) {
    const networkSettings = input?.currentSettings.find(s => (s.context = Types.PermissionContext.NETWORK));
    const apiKey = networkSettings?.settings.apiKey;
    const region = networkSettings?.settings.region || 'us';
    const data = input?.data || {};

    if (apiKey && data.shortDescription) {
      const { shortDescription, actor, time } = data;
      const client = new MixpanelService(apiKey, region);

      const event = {
        event: shortDescription,
        properties: {
          time: new Date(time),
          ...this.createEventProperties(data),
          ...this.createMemberProperties(data),
          distinct_id: actor?.id,
        },
      };

      const result: any = client.track(event);

      if (result?.status != 1) {
        logger.error('Cannot send data to Mixpanel: ', {
          status: result.status,
          error: result.error,
        });
        return {
          type: input.type,
          status: 'FAILED',
          data: result,
        };
      }
      return {
        type: input.type,
        status: 'SUCCEEDED',
        data: result,
      };
    }

    return {
      type: input.type,
      status: 'SUCCEEDED',
      data: {},
    };
  }

  private createEventProperties(data): any {
    if (!data?.object?.id) return {};
    return {
      ID: data.object.id,
      Slug: data.object.slug,
      Name: data.object.name,
      Title: data.object.title,
      Status: data.object.status,
      'Created At': data.object.createdAt,
      'Updated At': data.object.updatedAt,
      'Created By ID': data.object.createdById,
      'Owner ID': data.object.ownerId,
      'Is Reply': data.object.isReply,
      Count: data.object.count,
      'Post ID': data.object.postId,
      Reaction: data.object.reaction,
      'Space ID': data.object.spaceId,
      'Member ID': data.object.memberId,
      'Inviter ID': data.object.inviterId,
      Private: data.object.private,
      Hidden: data.object.hidden,
    };
  }
  createMemberProperties(data): any {
    if (!data?.actor?.id) return {};
    return {
      'Member ID': data?.actor?.id,
      'Role Type': data?.actor?.roleType,
    };
  }
}

export default WebhookController;
