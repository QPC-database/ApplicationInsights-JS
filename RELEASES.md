# Releases

## 2.6.3 (June 8th, 2021)

### Changelog

- #1268 Investigate and add a sender that uses fetch when XMLHttpRequest is not available
- #1545 Cannot modify the request headers and cookies when using a custom endpoint
- #1546 [Typings] Update the TypeScript typings to identify the readonly properties/fields and dynamic values of the snippet
- #1541 ITelemetryContext.user is sometimes null - setAuthenticatedUserContext throws
- #1569 [BUG] Authorization header included when enableRequestHeaderTracking is enabled
  - As part of this change the ["Authorization", "X-API-Key", "WWW-Authenticate"] headers will NO longer be logged when ```enableRequestHeaderTracking``` is enabled, if you want these headers to be sent to AzureMonitor you will need to override the default ```ignoreHeaders``` config which excludes them (See the [Configuration settings](https://github.com/Microsoft/ApplicationInsights-JS#configuration)).
- #1558 [BUG] Durations reported as zero (00:00:00.000) in Angular SPA for router changes
- #363 Script error: Browser exception message not providing information type and method
- #1568 Add VSCode specific exclusions
- #1572 Task 9901543: Remediate security vulnerabilities

### Update React plugin to v3.1.3

- Update Core dependency to ^2.6.3 Core changes
- Update DynamicProto version 1.1.4 (Removes unnecessary dependencies)

### Update React Native plugin to v2.3.3

- Update to React-Native 0.64.2
- Update Core dependency to ^2.6.3 Core changes
- Update DynamicProto version 1.1.4 (Removes unnecessary dependencies)

## 2.6.2 (April 22nd, 2021)

### Changelog

- #1536 Update DynamicProto version 1.1.2 (Fixes IE7 mode issue originally reported in #1534)
- #1280 Investigate removing the globals __extends() and __assign() populated by applicationinsights-shims
- #1523 Remove exposing global instances of __extends() and __assign() and update sideEffects usage (by removing globals)
- #1538 [BUG] Telemetry Buffer Getting Cleared in Offline Mode - Online Status Incorrectly Initialized in Offline Listener
- #1528 [BUG] correlationHeaderExcludePatterns is not honored in Ajax calls
- #1516 [BUG] App insight library will flush telemetry using beforeUnload event but this event is cancellable
- #1509 [BUG] Investigate changing the sideEffects: false to list only the files that include the shims module from the all AI modules so that webpack can evaluate correctly
- #1517 [BUG] addHousekeepingBeforeUnload should also be listening to the 'unload' event
- #1524 [BUG] Config items are not functional for current snippet disableFlushOnBeforeUnload, disableFlushOnBeforeUnload and maybe others
- #1440 [BUG] PageViewPerformanceManager.populatePageViewPerformanceEvent() is always returning zero for the network time
- #1393 [BUG] enableAutoRouteTracking should also update the Operation Name with the hashroute
- [BUG] Add test coverage for #1518
- #1510 Update PageView operation name to include the hash
- #1522 add click plugin version to sdkversion tag
- #1535 add click plugin js to cdn

### Update React plugin to v3.1.1 (April 26th, 2021)

- Update Core dependency to ^2.6.2 Core changes
- Update Shims dependency to ^2.0.0 (to address the __extends() and __assign()) issue
- #1536 Update DynamicProto version 1.1.2 (Fixes IE7 mode issue originally reported in #1534)

### Update React Native plugin to v2.3.1

- Update Core dependency to ^2.6.2 Core changes
- Update Shims dependency to ^2.0.0 (to address the __extends() and __assign()) issue
- #1536 Update DynamicProto version 1.1.2 (Fixes IE7 mode issue originally reported in #1534)

## 2.6.1 (Hotfix - March 30th, 2021)

### Changelog

- #1518 P1 - [BUG] v2.6.0 is not re-hydrating the automatic session id correctly for each request
- #1512 Expose the getCookieMgr() on the snippet proxy and analytics web instances

## 2.6.0 (March 23rd, 2021)

### Version bump is due to the following major changes

A large amount of [Tree-Shaking improvements](https://github.com/microsoft/ApplicationInsights-JS#tree-shaking-support-and-enhancements) have been included in this version, please [see the recommendations](TreeShakingRecommendations.md) you may need to apply to your code to take complete advantage of these changes to reduce the overall module sizes (when using NPM packages)

Also includes major changes to the cookie management, please [see the readme cookie configuration section](https://github.com/microsoft/ApplicationInsights-JS#icookiemgrconfig) and [cookie handling changes](https://github.com/microsoft/ApplicationInsights-JS#cookie-handling).

### Changelog

- General Performance improvements / optimizations
- #1059 Enable W3C distributed tracing on by default with backward compatibility
- #1076 Multiple Treeshaking enhancements, [see recommendations](TreeShakingRecommendations.md)
- #1091 Enable cookie support after the SDK has been initialized
- #1125 Disable Cookies
- #1276 [BUG] Does not work with Closure Compiler (possible fix, now generates `applicationinsights-web.d.ts` (This version is namespaced) and `applicationinsights-web.rollup.d.ts` in the dist folder
- #1434 Ability to specify cookie Path so that AI works behind App Gateway
- #1473 [BUG] New dts gneration doesn't work when the environment doesn't have powershell (introduced for #1276)
- #1474 Add initial stamp endpoint redirection logic
- #1478 [Bug] Ajax tracking for XHR and fetch is not always setting the start time correctly
- #1496 [BUG] applicationinsights-web npm package does not have types or a types folder.
- #1498 [BUG][ES6] TypeError: xxx is not a function or TypeError: DynamicProto [XXXX] is not in class heirarchy of [Object] #28
- #1503 [BUG] New Perf tests are randomly failing when the build environment is busy (tests added as part of #1076 and #1091)
- Some documentation updates

### Update React plugin to v3.1.0

- Update Core dependency to ^2.6.0 Core changes
- #1470 Update applicationinsights-react-js to react 17

### Update React Native plugin to v2.3.0

- Update Core dependency to ^2.6.0 Core changes

## 2.5.11 (January 15th, 2021)

### Changelog

- #1452 [BUG] v2.5.10 Snippet Initialization fails to redirect proxied functions -- causing terminal exception
- #1433 Typo in 'disableInstrumentaionKeyValidation' config property.

### Update Click Analytics plugin to v2.5.11

- Update Core dependency to ^2.5.11 Core changes
- #1441 [BUG] Fix issues based on pageName,clickevent name and improved the way we collect useful telemetry data
- Updated Docs


## 2.5.10 (November 16th, 2020)

### New extension @microsoft/applicationinsights-clickanalytics-js

Provides the ability to gather telemetry in Web pages to automatic track clicks using data meta tags.

### Changelog

- #1420 Fix issues with for..in usage with prototype extension libraries like ember.js and prototype.js
- #1417 Adding nuspec for new Snippet nuget package
- #1415 Update Publishing scripts to allow different container names -- replaces the cdn switch #1415
- #1411 [BUG] - License file link is invalid #1411
- #1410 Remove mention of resolution in Device Information
- #1408 Update publish scripts to support a sub-container
- #1409 Initial release of new Click Analytics Plugin
- #1407 Adding logger during core constructor
- #1403 [Feature Request] Snippet - Add an easier way to inject queue items as part of the snippet config (version 5 of snippet)
- #1402 [BUG] "ReferenceError: method is not defined" from 2.5.5+
- #420 CDN endpoint

### Update React plugin to v3.0.5

- Update Core dependency to ^2.5.10 Core changes

### Update React Native plugin to v2.2.9

- Update Core dependency to ^2.5.10 Core changes

## 2.5.9 (October 5th, 2020)

### Changelog

- #1395 Update publishing scripts to support automation
- #1391 Increase the randomness and size of the sessionId (newId())
- #1390 using older version of types/cheerio dependecy
- #1389 take out SPO support
- #1388 Bump shims version for React, React-Native and Angular to latest.
- #1384 Add sideEffects field to applicationinsights-shims package.json
  - Use updated Shims module (v1.0.2)
- #1381 [BUG] NPM package for @microsoft/applicationinsights-angularplugin-js does not have a dist folder
- #1377 [BUG] Session storage buffers being initialized though configured not to use
- #1375 Make AI JS SDK for with NativeScript-Angular
  - Use updated Shims module (v1.0.1)
- #1374 indexof is wrongly cased
- #1365 correlationHeaderExcludePatterns added to IConfig
- #1364 [BUG] PerfManager and NotificationManager are not exported in AISKU
- #1363 [BUG] correlationHeaderExcludePatterns missing from types
- #1361 Debug plugin readme changes
- #1359 Add trackMetric method for Angular plugin
- #1358 Add snippet setup for SPO extension solution and update README

### New Package applicationinsights-shims v1.0.2

- #1384 Add sideEffects field to applicationinsights-shims package.json

### New Package applicationinsights-shims v1.0.1

- #1375 Make AI JS SDK for with NativeScript-Angular

### Update React plugin to v3.0.4

- Update Core dependency to ^2.5.9 Core changes

### Update React Native plugin to v2.2.8

- Update Core dependency to ^2.5.9 Core changes

## 2.5.8 (August 31st, 2020)

### Changelog

- #1356 add documentation on how to make snippet changes
- #1355 update angular package name
- #1350 [BUG] The new IPerfEvent is using Date.now() which is not supported in an ES3 environment
- #1349 Update angular plugin track pageview logic and test
- #1343 [BUG] IPerfManager interface - the create() function is defined to return an IPerfEvent and not an IPerfEvent?
- #1340 Instrumentation Key validation
- #1018 Error Mismatched anonymous define() module
  - #1352 add .cjs.js and .cjs.min.js

### Update applicationinsights-rollup-es3 to v1.1.3

- #1350 [BUG] The new IPerfEvent is using Date.now() which is not supported in an ES3 environment
  - Added additional checks for Date.now() and Performance Api perf.now()

### Update React plugin to v3.0.3

- Update Core dependency to ^2.5.8 Core changes

### Update React Native plugin to v2.2.7

- Update Core dependency to ^2.5.8 Core changes

## 2.5.7 (August 7th, 2020)

### Changelog

- #1335 Add Performance / Testing support
  - Added IPerfManager and IPerfEvent interfaces to allow performance review / monitoring of the internal operations
  - [Performance Manager Documentation](./docs/PerformanceMonitoring.md)
- #1334 [BUG] Getting XMLHttpRequest and XDomainRequest is not defined errors for gatsby environment
- #1333 [BUG] DebugPlugin various updates
- #1331 AppInsightsCore: Enable setting NotificationManager during initialization
  - #1076 Refactor code to provide better tree shaking and minification of generated code
  - Updated Sender and support classes to move all private properties and methods into constructor closure
- #1328 applicationinsights-debugplugin-js: fixed various issues and updating to beta-2
- #1323 Add Retry as a SendRequestReason
- #1324[BUG] Type 'ReactNativePlugin' is not assignable to type 'ITelemetryPlugin'
  - Refactored the Plugin to extend BaseTelemetryPlugin (part of the #1076 work)
- #1321 [BUG] @microsoft/applicationinsights-web fails to initialize with latest version
- #1319 fix incorrect references to configuration parameter names
- #1316 Update dependency version of DynamicProto
  - Move all private properties and methods into constructor closure
  - #1316 Update dependency version of DynamicProto

### Updated React plugin to v3.0.2

- Update Core dependency to ^2.5.7 Core changes
- #1335 Add Performance / Testing support
  - Added IPerfManager and IPerfEvent interfaces to allow performance review / monitoring of the internal operations 
  - [Performance Manager Documentation](./docs/PerformanceMonitoring.md)

### Updated React Native plugin to v2.2.6

- Update Core dependency to ^2.5.7 Core changes
- #1335 Add Performance / Testing support
  - Added IPerfManager and IPerfEvent interfaces to allow performance review / monitoring of the internal operations 
  - [Performance Manager Documentation](./docs/PerformanceMonitoring.md)
- #1324 [BUG] Type 'ReactNativePlugin' is not assignable to type 'ITelemetryPlugin'
  - Refactored the Plugin to extend BaseTelemetryPlugin (part of the #1076 work)
- #1076 Refactor code to provide better tree shaking and minification of generated code
  - Move all private properties and methods into constructor closure
  - #1316 Update dependency version of DynamicProto

## 2.5.6 (Jul 6th, 2020)

### New (Beta) extension applicationinsights-debugplugin-js

- Created the initial extension to help developers understand, track, visualize and fix issues with events
- This extension injects a UI onto your page details for the component is available at https://github.com/microsoft/ApplicationInsights-JS/tree/master/extensions/applicationinsights-debugplugin-js
- This is a beta release so the UI, config etc are not yet complete, feedback for features, suggestions or changes are welcome -- please create an Issue
- The detailed view is still under construction and contains known bugs, these will be address in the next few months (releases) as we build out the module. We had not originally planed to have any detailed view as part of this initial beta release.

### Changelog

- #1311 Allow the generated modules to extend the namespace defined by "name" in rollup config -- rather than always replace.
  - Changes the way the "Microsoft.ApplicationInsights" is defined for each module to all modules to be added to the same namespace
- #1309 When using prototype js the SessionStorage become corrupted causing requests internal exceptions
- #1303 Task 7027291: Investigate CDN Configuration to support custom domain (automate CDN deployment scripts)
- #1299 Releasing core queue as soon as possible (fixes lost events from page load immediate unload with no additional events)
- #1297 Created initial applicationinsights-debugplugin-js
- #1289 [Documentation] doc: SPO set up instruction
- #1286 [Documentation] Update JS SDK Snippet documentation with bug fixes (new v4 snippet)
- #1283 [BUG] (Snippet v3) AppInsights stub methods captured incorrect method names in the closure
- #1262 [BUG] Custom properties added with addTelemetryInitializer are ignored for exceptions
- #1245 React Native - AI (Internal): 19 message: "Could not add handler for beforeunload and pagehide"
  - Add isReactNative() function for detecting the runtime environment
- #1095 Add an Error Boundary to the React plugin
- #1089 Blocking certain URIs/Patterns from fetch tracking (patch included)
  - Added new config 'correlationHeaderExcludePatterns' to allow disabling correlation headers using regular expressions

### Updated React plugin to v3.0.1

- #1311 Allow the generated modules to extend the namespace defined by "name" in rollup config -- rather than always replace.
  - Changes the way the "Microsoft.ApplicationInsights" is defined for each module to all modules to be added to the same namespace

### Update applicationinsights-rollup-es3 to v1.1.2

- #1311 Allow the generated modules to extend the namespace defined by "name" in rollup config -- rather than always replace.

## 2.5.5 (Jun 2nd, 2020)

### Updated React plugin to v3.0.0

- Updated to TypeScript 3.x
- Removed React plugin from main rush pipeline
- #991 Don't work with React HOOKS
  - #1120 Introducing React Hooks for AppInsights #1120

### New Package applicationinsights-shims v1.0.0

- Created to remove dependency on TSLib as v 1.13.0 has introduced build breaks
  - provides internal implementation of __extends() and __assign() when no pre-existing version is present

### Changelog

- #1278 Add optional 'eventsSendRequest' notification to NotificationManager
- #1269 TsLib v1.13.0 has breaking change (Remove dependency on TSLib)
  - Added new package **'applicationinsights-shims@1.0.0'**
- Removed React plugin from main rush pipeline
- #991 Don't work with React HOOKS
  - #1120 Introducing React Hooks for AppInsights #1120
- #1274 Fix for withAITracking wrapping functional components.
- Using crypto to generate GUIDs when available (Make GUID more random)
- #1260 [BUG] Can't include Correlation Header on IE can fail
- #1258 Update snippet to support reporting script load failures
- #1251 [BUG] ajax.ts is using string trim() which is not supported on IE7/8
- #1249 Identify whether the script is being consumed via the CDN or NPM package
- Several minor documentation updates

## 2.5.4 (Apr 7th, 2020)

### Changelog

- #1242 Upgrading the tslib dependency to 1.11.1
- #1233 [BUG] Duplicate React dependency
- #1232 [BUG] window.appInsights.properties is marked private
  - Fix issue by always exposing window.appInsights.context
- #1240 [BUG] Telemetry correlation headers are not included for all fetch requests
- #1229 [BUG] Unable to include telemetry correlation headers
- #1227 SPFX - undefinedundefined is not defined
- #1221 npm @microsoft/applicationinsights-web: license information missing in package.json
- #1191 [BUG] ICustomProperties does not support setting values

## 2.5.3 (Mar 25th, 2020)

### Changelog

- #1224 [BUG] When running in IE7/8 the app insights doesn't initialize and gets stuck in a loop (long running script)

## 2.5.2 (Mar 11th, 2020)

### Changelog

- #1217 [BUG] App Insights fails when the XHR object is not extensible (or frozen)
- #1186 [BUG] App Insights initialization setting 'enableAjaxErrorStatusText is not working #1218

## 2.5.1 (Mar 9th, 2020)

### Changelog

- #1210 [BUG] Typescript error when using @microsoft/applicationinsights-web 2.5.0 and "noImplicitAny"/"strict" option
- #1207 [BUG] The latest version 2.4.4 cannot connect front-end with back-end on the Application Map on Application Insights

## 2.5.0 (Mar 9th, 2020)

### Changelog

- #1204 When a fetch polyfill is installed there reporting endpoint is also causing events to be sent
- #1202 ai_user and ai_session cookies not set #1203
- #1201 add to auto track exceptions in react native plugin
- #1199 Build is breaking when you do a "rush update --full --purge --recheck" due to tslib v1.11.0 update
- #1194 XHR/Fetch enhancement - add additional telemetry from window.performance #1195
- #1193 add sanitizer for operationName
- #1189 Add the option to specify the refUri with stopTrackPage #1190
- #1186 App Insights initialization setting 'enableAjaxErrorStatusText' is not working #1187

#### XHR/Fetch enhancement

Adds additional performance data derived from the window.performance.getEntries() for the fetch or XHR request.

Configuration options
| Name | Default | Description |
|------|---------|-------------|
| enableAjaxPerfTracking | false | Default false. Flag to enable looking up and including additional browser window.performance timings in the reported ajax (XHR and fetch) reported metrics. 
| maxAjaxPerfLookupAttempts | 3 | Defaults to 3. The maximum number of times to look for the window.performance timings (if available), this is required as not all browsers populate the window.performance before reporting the end of the XHR request and for fetch requests this is added after its complete.
| ajaxPerfLookupDelay | 25 | Defaults to 25ms. The amount of time to wait before re-attempting to find the windows.performance timings for an ajax request, time is in milliseconds and is passed directly to setTimeout().

#### Auto track exception React Native Plugin

This has been enabled by default in the updated version.
It can be disabled by adding the ```disableExceptionCollection``` config value with a value of true.

## 2.4.4 (Feb 5th, 2020)

### Changelog

- #1182 Fix error TS2430: Interface 'Window' incorrectly extends interface 'WindowEventHandlers'
- #1185 Rollback namespace overwrite change

## 2.4.3

## Changelog

- Syntax error tools/rollup-es3/src/es3/Es3Tokens.ts #1179

## 2.4.2

### ES3 Support

An additional conversion was required for ES3 support as TypeScript was adding a getter for embedding a constant enum into the Common class.

### Changelog

 - #1177 Add additional checks and polyfil for TypeScript get translations for constants

## v 2.4.1...2.4.0

### ES3 Support

With this release the source files can be loaded in an ES3 environment (IE7/8) and send requests to the server. As part of this change you will now receive requests from users using an older browser, prior to this version users using an ES3 base browser will (most likely) have been getting a javascript error, which would have caused no data to be sent.

### Enable support for reusing plugins in multiple instances of AppInsights #1132

We have added upport to enable reusing the same plugin in different instances of AppInsights, owned by the same application (but using different Instrumentation keys) is required so that they can reuse a single Plugin instance for all instances.

This changes introduces a new [`IProcessTelemetryContext`](https://github.com/microsoft/ApplicationInsights-JS/blob/master/shared/AppInsightsCore/src/JavaScriptSDK/ProcessTelemetryContext.ts) interface that is passed to the processTelemetry() method so that the plugins can use the current request context for the event rather than the context during initialization.

To assist with creating plugins we have also introduced a base class that you can use for creating new plugins [BaseTelemetryPlugin](https://github.com/microsoft/ApplicationInsights-JS/blob/master/shared/AppInsightsCore/src/JavaScriptSDK/BaseTelemetryPlugin.ts), details are included on the [Readme](https://github.com/microsoft/ApplicationInsights-JS/blob/master/README.md)

### Changelog

- #1175 [BUG] Typescript build with 2.4.0 breaks #1173
- #1174 Legacy Manage SameSite Cookie Settings #1126
- #1172 Update SameSite logic to handle UserAgents that don't support the attribute
- #1169 Fixup Rollup ES3 plugin package.json
- #1167 Add better support for referencing global objects from a window and web workers
- #1164 add null check for sessionManager
- #1162 [BUG]AppInsights not working in IE7 #1142
- #1161 include response error data
- #1159 Export Common Telemetry classes in Snippet
- #1157 fix: only change SameSite when secure
- #1154 Queue events when track is called and not all extensions are initialized
- #1153 Do not clean telemetryInitializers during initialization
- #1150 Remove interface code from API reference and link
- #1135 fix: dont block corr on empty location host
- #1133 Enable support for reusing plugins in multiple instances of AppInsights #1132
- #1129 fix: console logging not honoring setting
- #1122 fix anchor link
- #1116 Move tslib to sku dependencies
- #1113 [Enhancement] AI is not catching all "Unload" dom events #1080

## v 2.3.1
### Changelog
- #1102 Enable support for IE8
- #1096 Add extra window nullchecks for non-browser environments
- #1105 Fix issue where operation name is overwritten

## v 2.3.0...2.2.4

### Changelog
- #1066 Adds Connection String support
- #1061, #1065,#1067, #1088 misc bug fixes

## v 2.2.4

### Changelog
- #1054 Fix issue with AppInsightsCore refactor

## v 2.2.3
### Changelog
- #1051 Add to call track trace on user init sending browser info to the end point when loggingLevelTelemetry config is on
- #1050 Address issue https://github.com/MicrosoftDocs/azure-docs/issues/39011
- #1049 Fix issue with PageViewPerformance event being sent with undefined name property
- #1041 Add tslint error screening
- #1038 Re-organize repo folders
- #1035 Update to use PerformanceNavigationInterface for supported browsers

## v 2.2.2
### Changelog
- #1030 Fix issue with appId correlation being appended with an incorrect format

## v 2.2.1
### Changelog
- #1015 Update to use beaconSender for page unload when browser supports Beacon API
- #1028 Fix issue where window.location is not defined
- #1021 Fix issue with not parsing correlationContext
- #1020 Disable by default logging to console internal SDK errors. Enable by default logging as telemetry for internal SDK errors

## v 2.2.0
### Changelog
- #946 **Feature**: Adds automatic incoming/outgoing header tracking. *Outgoing header tracking is experimental and may be miss some headers*
- #973 **Feature**: Support propagation of W3C compatible distributed tracing headers
- #983: Fix issue regarding incorrect referrer uri when using `enableAutoRouteTracking`
- #984: Fix issue where adding custom properties/tags would not work in telemetry processors
- #999: Fix IE issue when using `enableAutoRouteTracking`
- #1000

## v 2.1.1
Patch release containing fixes to automatic Single Page Application route change tracking via `enableAutoRouteTracking`

### Changelog
#970 - Fixes #967 #969

## v 2.1.0
### Highlights

#### Source Map Support
> *You do not need to upgrade for drag and drop to work. It will work on all previous and future versions of the javascript (and Node.js) SDK

https://i.imgur.com/Efue9nU.gif
You can now drag and drop your source maps onto your Exception Telemetry in the Azure Portal to unminify your callstack. Please open an issue or use the Feedback button in the Portal if a source map you've uploaded is not working as intended. This is a first iteration and in a future update, your source maps will be automatically unminified.

#### SPA Route Change Tracking
You can set `enableAutoRouteTracking: true` to enable state based route tracking for your Single Page Application (React, Angular, Vue, etc). You do not need to install a separate plugin to use this configuration option.

This setting will cause a new Page View telemetry item to be sent each time your app's route changes (**including** Hash route changes).

### Changelog
- #920 Resolve jest testing issues when using React plugin
- #928 Make analytics plugin have last priority
- #936 Fallback to XHR Sender when beacon sender tries to send >64 KB
- #947 Add SPA route change tracking
- #948 Docs: Source map support
- #952 Re-enable `samplingPercentage` functionality
- #918, #919, #932 #933 #935 #939 #940 #951

## v 2.0.1

### trackException Change
This update has a couple of **non-breaking** API changes. Namely, `trackException` is now consistent with the Node.js SDK. The only change here is the named argument is renamed from **`error`** to **`exception`**. A shim is in place so **any existing usages of `trackException` will still work**, and the old field is marked as optional, so any type-checked files will still "compile". There are no breaking changes with this change, but you are encouraged to use `exception` as your named argument field as error will be deprecated in a future major version.

#### Old
```js
appInsights.trackException({ error: new Error() });
```
#### New
```js
appInsights.trackException({ exception: new Error() });
```

### Correlation Header Domain Whitelisting #869

Second, the ability to only send correlation headers to specific, whitelisted domains is now available as a configuration option , `correlationHeaderDomains`. It accepts an `array` of domain `strings`. Wildcards ("*") are okay. By populating this array, all other domains which your application makes requests to will **not** have correlation headers included. This setting makes it easy to avoid OPTIONS requests to services outside of your control.

You can use the inclusion list and the exclusion list in conjunction with each other to add correlation headers to a particular domain, `example.com`, and at the same time exclude headers from a prefixed version of it, `no-headers.example.com`.

###  Tag Override Change #903

Performing custom tag overrides is now more consistent with all of the other Application Insights SDKs, in that it is modified via a simple key-value dictionary. There are no breaking changes with this update, and if you are setting any tags via the old way, they will still work as they do now. You are encouraged to update them since the old way will be deprecated in a future major version release.

#### Old
```js
var telemetryInitializer = (item) => {
  item.tags.push({ "ai.cloud.role": "My Web App" });
};
appInsights.addTelemetryInitializer(telemetryInitializer);
```
#### New
```js
var telemetryInitializer = (item) => {
  item.tags["ai.cloud.role"] = "My Web App";
};
appInsights.addTelemetryInitializer(telemetryInitializer);
```

### Changelog
#869 - config: add ability to whitelist specific domains for adding correlation headers
#893 - docs: fix sample configuration settings
#899 - common: replace Array.some with Array.forEach to simplify polyfill story, add tests
#902 - snippet: add missing methods to lazy loaders
#903 - tags can now be set with same API as other AI SDKs
#904 - rename IExceptionTelemetry.error --> IExceptionTelemetry.exception
#905 - react: fix plugin causing jest tests to fail
#907 - docs: add mention of how to update current context's operation
#908 - react: remove analytics package dependency
#910 - docs: update context refresh information
#913 - Remove code from adding libVer from extensions
#918 - automatically add `ai.operation.name` tag, add `id` to pageview telemetry
#919 - fix issue with `namePrefix` not affecting send buffers

## v 2.0.0

### Changelog
- #878 Fix issue with missing pageviewperformance
- #881 Change access level of some non-exposed methods
- #883 Allow `id` to be set in `Exception` telemetry