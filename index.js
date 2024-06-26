import { OpenFeature, ProviderEvents } from '@openfeature/server-sdk';
import { LaunchDarklyProvider } from '@launchdarkly/openfeature-node-server';

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY ?? '';

// Set featureFlagKey to the feature flag key you want to evaluate
const featureFlagKey = process.env.LAUNCHDARKLY_FLAG_KEY ?? 'sample-feature';

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
// Remember when using OpenFeature to use `targetingKey` instead of `key`.
const context = {
  targetingKey: 'example-user-key',
  kind: 'user'
};

await OpenFeature.setProviderAndWait(new LaunchDarklyProvider(sdkKey));

OpenFeature.addHandler(ProviderEvents.Ready, async (_eventDetails) => {
  const client = OpenFeature.getClient();

  const flagValue = await client.getBooleanValue(featureFlagKey, false, context);

  console.log(`The ${featureFlagKey} feature flag evaluates to ${flagValue}`);

  // Here we ensure that the SDK shuts down cleanly and has a chance to deliver analytics
  // events to LaunchDarkly before the program exits. If analytics events are not delivered,
  // the context properties and flag usage statistics will not appear on your dashboard. In a
  // normal long-running application, the SDK would continue running and events would be
  // delivered automatically in the background.
  await OpenFeature.close();
});
