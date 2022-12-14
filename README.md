# LaunchDarkly sample OpenFeature Server-Side Node.js application

We've built a simple console that demonstrates how LaunchDarkly's OpenFeature provider works.

The LaunchDarkly OpenFeature provider for the Server-Side SDK for Node.js is designed primarily for use in multi-user systems such as web servers and applications. It follows the server-side LaunchDarkly model for multi-user contexts. It is not intended for use in desktop, browser, and embedded systems applications.

## Supported Node versions

This sample is compatible with Node.js versions 14 and above.

## Build instructions

1. Install dependencies using `npm install`.

2. Edit `index.js` and set the value of `sdkKey` to your LaunchDarkly SDK key. If there is an existing boolean feature flag in your LaunchDarkly project that you want to evaluate, set `featureFlagKey` to the flag key.

```
const sdkKey = '1234567890abcdef';

const featureFlagKey = 'my-flag';
```

3. On the command line, run `npm start`

You should receive the message ”Feature flag ‘<flag key>’ is <true/false> for this user”.