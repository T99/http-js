/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:53 PM -- June 11th, 2019.
 *	Project: http-request-js
 */

import { HTTPRequest } from "./http-request";

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */

// export { ClassName } from "./class-location";

let myReq: HTTPRequest = new HTTPRequest();

myReq.getHeadersManager().setHeader("Accept", "audio/*, video/*");

console.log(myReq.getHeadersManager().getPreferredFormats(false));
console.log(myReq.getHeadersManager().getPreferredSupportedFormats(
	["audio/v2", "audio/v1", "video/v1", "video/v2", "text/v1", "text/v2"],
	false
));
