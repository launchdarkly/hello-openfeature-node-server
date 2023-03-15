import { BeforeHookContext, EvaluationContext, Hook,OpenFeature } from '@openfeature/js-sdk';
import { init } from 'launchdarkly-node-server-sdk';
import { LaunchDarklyProvider } from '@launchdarkly/openfeature-node-server';


// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = '';

// Set featureFlagKey to the feature flag key you want to evaluate
const featureFlagKey = 'my-boolean-flag';

class AnonymousDefaultContext implements Hook {
  before(hookContext: BeforeHookContext, hookHints?: Readonly<Record<string, unknown>> | undefined):
    void | EvaluationContext | Promise<void | EvaluationContext> {
      if (Object.entries(hookContext.context).length === 0) {
        return { targetingKey: 'OpenFeature default', anonymous: true };
      }
  }
}

OpenFeature.addHooks(new AnonymousDefaultContext());

async function runExample() {
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
}

runExample();
