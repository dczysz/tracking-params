import { paramsToEntries } from './utils';
import { ParamInfo, DOMAIN_PARAMS } from './params';

interface UrlTrackingData {
  url: string;
  isDirty: boolean;
  trackingParams: ParamInfo[];
  cleanUrl: string;
}

export const getTrackingData = (dirtyUrl: string): UrlTrackingData => {
  const urlObj = new URL(dirtyUrl);

  const urlData: UrlTrackingData = {
    url: dirtyUrl,
    isDirty: false,
    trackingParams: [],
    cleanUrl: dirtyUrl,
  };

  // Skip checks if no params
  if (!urlObj.searchParams.toString().length) {
    return urlData;
  }

  // Loop through domains to find a match
  // If domain match, loop through params
  // If param match:
  // 1. Set `isDirty` to true
  // 2. Add `trackingParams` entry
  // 3. Set `cleanUrl` as url with that param removed
  DOMAIN_PARAMS.forEach(domainParams => {
    // Check for domain match
    if (urlObj.hostname.includes(domainParams.domain)) {
      // Copy params to array so they can be freely deleted from urlObj
      const urlParams = paramsToEntries(urlObj.searchParams);

      urlParams.forEach(([key, value]) => {
        domainParams.params.forEach(badParam => {
          // Check for param key match
          const match =
            typeof badParam === 'string'
              ? key === badParam
              : badParam.test(key);

          if (match) {
            urlData.isDirty = true;
            urlData.trackingParams.push({ key, value });
            urlObj.searchParams.delete(key);
            urlData.cleanUrl = urlObj.toString();
          }
        });
      });

      // Run domain specific handler to further clean URL
      if (typeof domainParams.handler === 'function') {
        const moreInfo = domainParams.handler(urlObj);
        if (moreInfo) {
          urlData.trackingParams.push(...moreInfo.newParams);
          urlData.cleanUrl = moreInfo.newCleanUrl;
        }
      }
    }
  });

  return urlData;
};

export const cleanUrl = (dirtyUrl: string): string =>
  getTrackingData(dirtyUrl).cleanUrl;
