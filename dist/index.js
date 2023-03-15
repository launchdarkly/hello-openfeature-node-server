import { OpenFeature } from '@openfeature/js-sdk';
import { init } from 'launchdarkly-node-server-sdk';
import { LaunchDarklyProvider } from '@launchdarkly/openfeature-node-server';
// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = 'sdk-95f77c0e-6ce3-440b-9990-0d1cc6e1b34e';
// Set featureFlagKey to the feature flag key you want to evaluate
const featureFlagKey = 'my-boolean-flag';
class AnonymousDefaultContext {
    before(hookContext, hookHints) {
        if (Object.entries(hookContext.context).length === 0) {
            return { targetingKey: 'OpenFeature default', anonymous: true };
        }
    }
}
OpenFeature.addHooks(new AnonymousDefaultContext());
const ldClient = init(sdkKey);
await ldClient.waitForInitialization();
OpenFeature.setProvider(new LaunchDarklyProvider(ldClient));
const client = OpenFeature.getClient();
const flagValue = await client.getBooleanValue(featureFlagKey, false);
console.log(`Feature flag '${featureFlagKey}' is ${flagValue} for this context`);
// Here we ensure that the SDK shuts down cleanly and has a chance to deliver analytics
// events to LaunchDarkly before the program exits. If analytics events are not delivered,
// the context properties and flag usage statistics will not appear on your dashboard. In a
// normal long-running application, the SDK would continue running and events would be
// delivered automatically in the background.
await ldClient.flush();
ldClient.close();
//# sourceMappingURL=index.js.map