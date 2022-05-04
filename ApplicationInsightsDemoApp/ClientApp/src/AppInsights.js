import React from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
var appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'fc26ab45-ac77-4d25-8eae-f96ac0d75188',
        connectionString: 'InstrumentationKey=fc26ab45-ac77-4d25-8eae-f96ac0d75188;IngestionEndpoint=https://southcentralus-3.in.applicationinsights.azure.com/;LiveEndpoint=https://southcentralus.livediagnostics.monitor.azure.com/',
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        autoTrackPageVisitTime: true,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory }
        }
    }
});
appInsights.loadAppInsights();
appInsights.trackPageView();


export const trackException = (error) => {
    appInsights.trackException(error);
};

export const trackEvent = (eventName, data) => {
    appInsights.trackEvent({ name: eventName }, data);
};

export default Component => withAITracking(reactPlugin, Component);
export { reactPlugin, appInsights };
