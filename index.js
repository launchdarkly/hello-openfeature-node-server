import { OpenFeature } from '@openfeature/js-sdk';
import { init } from 'launchdarkly-node-server-sdk';
import { LaunchDarklyProvider } from '@launchdarkly/openfeature-node-server';

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = '';

// Set flagKey to the feature flag key you want to evaluate
const flagKey = 'my-boolean-flag';

// Set up the user properties. This user should appear on your LaunchDarkly users dashboard
// soon after you run the demo.
// Remember when using OpenFeature to use `targetingKey` instead of `key`.
const context = {
  targetingKey: 'example-user-key'
};

const ldClient = init(sdkKey);
await ldClient.waitForInitialization();

OpenFeature.setProvider(new LaunchDarklyProvider(ldClient));
const client = OpenFeature.getClient();

const flagValue = await client.getBooleanValue(flagKey, false, context);

console.log(`Feature flag '${flagKey}' is ${flagValue} for this user`);

// Here we ensure that the SDK shuts down cleanly and has a chance to deliver analytics
// events to LaunchDarkly before the program exits. If analytics events are not delivered,
// the user properties and flag usage statistics will not appear on your dashboard. In a
// normal long-running application, the SDK would continue running and events would be
// delivered automatically in the background.
await ldClient.flush();
ldClient.close();
