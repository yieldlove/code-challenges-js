import {registerBidder} from '../src/adapters/bidderFactory.js';
import * as utils from '../src/utils.js';
import {BANNER} from '../src/mediaTypes.js';

const ENDPOINT_URL = 'http://test.yieldlove.com:20457/bids';

const DEFAULT_BID_TTL = 30;
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_NET_REVENUE = true;

export const spec = {
  code: 'yieldlove',
  aliases: ['yl'],
  supportedMediaTypes: [BANNER],

  isBidRequestValid: function (bid) {
    return !!bid.params.placementId
  },

  buildRequests: function (validBidRequests, bidderRequest) {
    if (!validBidRequests || !bidderRequest) {
      return;
    }

    const impressions = validBidRequests.map(bidRequest => ({
      id: bidRequest.bidId,
      placementId: bidRequest.params.placementId,
      adUnitCode: bidRequest.adUnitCode,
      banner: {
        format: bidRequest.sizes.map(sizeArr => ({
          w: sizeArr[0],
          h: sizeArr[1],
        }))
      }
    }));

    const trbRequest = {
      auctionId: validBidRequests[0].auctionId,
      imp: impressions
    }

    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: JSON.stringify(trbRequest),
      options: {
        contentType: 'application/json',
        withCredentials: false,
        crossOrigin: true,
      },
    };
  },

  interpretResponse: function (serverResponse) {
    const bidResponses = [];
    const response = (serverResponse || {}).body;
    // response is always one seat (exchange) with (optional) bids for each impression
    if (response && response.bids) {
      response.bids.forEach(bid => {
        bidResponses.push({
          requestId: bid.requestId,
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          ad: bid.content,
          ttl: DEFAULT_BID_TTL,
          creativeId: bid.creativeId,
          netRevenue: DEFAULT_NET_REVENUE,
          currency: DEFAULT_CURRENCY,
          placementId: bid.placementId
        })
      })
    } else {
      utils.logInfo('yieldlove.interpretResponse :: no valid responses to interpret');
    }
    return bidResponses;
  },
  getUserSyncs: function () {

  },

};
registerBidder(spec);
