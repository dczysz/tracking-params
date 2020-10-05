# Tracking Params

Easily get and remove unwanted tracking parameters from URLs

## Installation

```bash
npm install tracking-params
```

## Usage

```js
const tracking = require('tracking-params');

const url = 'https://example.com?ok=ok';
const dirtyUrl = url + '&utm_term=term';

console.log(tracking.cleanUrl(url));
// 'https://example.com?ok=ok'

console.log(tracking.cleanUrl(dirtyUrl));
// 'https://example.com?ok=ok'

console.log(tracking.getTrackingData(url));
// {
//   url: 'https://example.com?ok=ok',
//   isDirty: false,
//   trackingParams: [],
//   cleanUrl: 'https://example.com?ok=ok'
// }

console.log(tracking.getTrackingData(dirtyUrl));
// {
//   url: 'https://example.com?ok=ok&utm_term=term',
//   isDirty: true,
//   trackingParams: [
//     { key: 'utm_term', value: 'term' }
//   ],
//   cleanUrl: 'https://example.com?ok=ok'
// }
```
