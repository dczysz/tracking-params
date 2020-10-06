# Tracking Params ![Build Status](https://img.shields.io/github/workflow/status/dczysz/tracking-params/CI) ![Bundle Size](https://img.shields.io/bundlephobia/min/tracking-params)

Easily get and remove unwanted tracking parameters from URLs

## Installation

```bash
npm install tracking-params
```

## Usage

```js
const { cleanUrl, getTrackingData } = require('tracking-params');

const url = 'https://example.com?ok=ok';
const dirtyUrl = url + '&utm_term=term';

console.log(cleanUrl(url));
// 'https://example.com?ok=ok'

console.log(cleanUrl(dirtyUrl));
// 'https://example.com?ok=ok'

console.log(getTrackingData(url));
// {
//   url: 'https://example.com?ok=ok',
//   isDirty: false,
//   trackingParams: [],
//   cleanUrl: 'https://example.com?ok=ok'
// }

console.log(getTrackingData(dirtyUrl));
// {
//   url: 'https://example.com?ok=ok&utm_term=term',
//   isDirty: true,
//   trackingParams: [
//     { key: 'utm_term', value: 'term' }
//   ],
//   cleanUrl: 'https://example.com?ok=ok'
// }
```
