import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowFontOrigin('data:');
BrowserPolicy.content.allowOriginForAll('*.stripe.com');
BrowserPolicy.content.allowOriginForAll('*.youtube.com');
BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
