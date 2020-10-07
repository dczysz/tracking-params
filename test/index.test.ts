import { cleanUrl, getTrackingData } from '../src';

describe('getTrackingData function', () => {
  const defaultUrl = 'https://example.com';

  it('returns basic data if no tracking params in provided url', () => {
    let cleanUrl = defaultUrl;
    let trackingData = getTrackingData(cleanUrl);
    expect(trackingData.url).toBe(cleanUrl);
    expect(trackingData.isDirty).toBe(false);
    expect(trackingData.trackingParams.length).toBe(0);
    expect(trackingData.cleanUrl).toBe(cleanUrl);

    cleanUrl = `${defaultUrl}/test/`;
    trackingData = getTrackingData(cleanUrl);
    expect(trackingData.url).toBe(cleanUrl);
    expect(trackingData.isDirty).toBe(false);
    expect(trackingData.trackingParams.length).toBe(0);
    expect(trackingData.cleanUrl).toBe(cleanUrl);
  });

  it('returns basic data along with clean url and tracking params if in provided url', () => {
    let dirtyUrl = `${defaultUrl}/?utm_medium=test&ok=ok`;
    let trackingData = getTrackingData(dirtyUrl);
    expect(trackingData.url).toBe(dirtyUrl);
    expect(trackingData.isDirty).toBe(true);
    expect(trackingData.trackingParams.length).toBe(1);
    expect(trackingData.cleanUrl).toBe(`${defaultUrl}/?ok=ok`);

    dirtyUrl = `${defaultUrl}/test/?utm_term=test&ok=ok`;
    trackingData = getTrackingData(dirtyUrl);
    expect(trackingData.url).toBe(dirtyUrl);
    expect(trackingData.isDirty).toBe(true);
    expect(trackingData.trackingParams.length).toBe(1);
    expect(trackingData.cleanUrl).toBe(`${defaultUrl}/test/?ok=ok`);

    dirtyUrl = `${defaultUrl}/test?fbclid=test&ok=ok`;
    trackingData = getTrackingData(dirtyUrl);
    expect(trackingData.url).toBe(dirtyUrl);
    expect(trackingData.isDirty).toBe(true);
    expect(trackingData.trackingParams.length).toBe(1);
    expect(trackingData.cleanUrl).toBe(`${defaultUrl}/test?ok=ok`);

    dirtyUrl = 'https://twitter.com/test?s=20&ok=ok&utm_medium=test';
    trackingData = getTrackingData(dirtyUrl);
    expect(trackingData.url).toBe(dirtyUrl);
    expect(trackingData.isDirty).toBe(true);
    expect(trackingData.trackingParams.length).toBe(2);
    expect(trackingData.cleanUrl).toBe('https://twitter.com/test?ok=ok');
  });

  it('runs domain specific handler functions if provided', () => {
    let dirtyUrl =
      'https://www.amazon.com/Product-Name/dp/B07GVHJ1QL/ref=pd_sbs_193_4/133-4596300-1462537?pd_rd_i=B07GVH91NQ&psc=1&refRID=XWRKTMR4MM98EW1CNEM1&ok=ok';

    let trackingData = getTrackingData(dirtyUrl);
    expect(trackingData.url).toBe(dirtyUrl);
    expect(trackingData.isDirty).toBe(true);
    expect(trackingData.trackingParams.length).toBe(4);
    expect(trackingData.cleanUrl).toBe(
      'https://www.amazon.com/Product-Name/dp/B07GVHJ1QL/?ok=ok'
    );
  });
});

describe('cleanUrl function', () => {
  const defaultUrl = 'https://example.com';

  it('returns unchanged URL if no tracking params found', () => {
    let url = defaultUrl;
    expect(cleanUrl(url)).toBe(url);

    url = defaultUrl + '/';
    expect(cleanUrl(url)).toBe(url);

    url = defaultUrl + '?ok=ok';
    expect(cleanUrl(url)).toBe(url);

    url = defaultUrl + '/?ok=ok';
    expect(cleanUrl(url)).toBe(url);

    url = defaultUrl + '/?ok=ok&';
    expect(cleanUrl(url)).toBe(url);
  });

  it('returns cleaned URL if tracking params found', () => {
    let url = `${defaultUrl}/?utm_medium=test&ok=ok`;
    expect(cleanUrl(url)).toBe(`${defaultUrl}/?ok=ok`);

    url =
      'https://amazon.com/abc?pd_rd_r=bad&pf_rd_r=bad&ie=bad&ok=ok&utm_medium=bad';
    expect(cleanUrl(url)).toBe('https://amazon.com/abc?ok=ok');
  });
});
