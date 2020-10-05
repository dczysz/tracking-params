import { DOMAIN_PARAMS } from './params';

interface UrlTrackingData {
  url: string;
  isDirty: boolean;
  trackingParams: { key: string; value: string }[];
  cleanUrl: string;
}

export const getTrackingData = (dirtyUrl: string) => {
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
          if (new RegExp(badParam).test(key)) {
            urlData.isDirty = true;
            urlData.trackingParams.push({ key, value });
            urlObj.searchParams.delete(key);
            urlData.cleanUrl = urlObj.toString();
          }
        });
      });
    }
  });

  return urlData;
};

export const cleanUrl = (dirtyUrl: string) =>
  getTrackingData(dirtyUrl).cleanUrl;

// Map URLSearchParams to [ key, value ][]
const paramsToEntries = (params: URLSearchParams) => {
  const _params: { [key: string]: string } = {};
  params.forEach((value, key) => {
    _params[key] = value;
  });
  return Object.entries(_params);
};
