/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:53 PM -- June 11th, 2019.
 *	Project: http-js
 */

/* tslint:disable:align */

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */

// '/error/'
export { HTTPRequestError } from "./error/http-request-error";

// '/headers/'
export {
	HTTPHeadersManager,
	HTTPHeaders,
	ParseableHTTPHeaders,
	FieldTransformer
} from "./headers/http-headers-manager";

	// '/headers/fields/'
	export {
		HTTPQualityWeightedHeader,
		QualityWeightedValue,
		GenericQualityWeightedValue
	} from "./headers/fields/http-quality-weighted-header";
	export { HTTPAcceptHeaderManager, AcceptHeaderValue } from "./headers/fields/http-accept-header-manager";
	export { HTTPCookiesHeaderManager } from "./headers/fields/http-cookies-header-manager";

// '/messages/'

	// '/messages/message/'
	export { HTTPMessage, HTTPMessageConfig } from "./messages/message/http-message";
	export { IncomingHTTPMessage } from "./messages/message/incoming-http-message";
	export { OutgoingHTTPMessage } from "./messages/message/outgoing-http-message";
	
	// '/messages/request/'
	export { HTTPRequest, HTTPRequestConfig } from "./messages/request/http-request";
	export { AbstractIncomingHTTPRequest } from "./messages/request/abstract-incoming-http-request";
	export { AbstractOutgoingHTTPRequest } from "./messages/request/abstract-outgoing-http-request";

	// '/messages/response/'
	export { HTTPResponse, HTTPResponseConfig } from "./messages/response/http-response";
	export { AbstractIncomingHTTPResponse } from "./messages/response/abstract-incoming-http-response";
	export { AbstractOutgoingHTTPResponse } from "./messages/response/abstract-outgoing-http-response";
	
// '/parsing/'
export {
	getDefaultBodyParser,
	setDefaultBodyParser,
	defaultBodyParserImplementation,
	BodyParserFunction,
	BodyParserResult
} from "./parsing/body-parsing";
export {
	getDefaultBodyPrepper,
	setDefaultBodyPrepper,
	defaultBodyPrepperImplementation,
	BodyPrepperFunction
} from "./parsing/body-prepping";
export { parseCookie, stringifyCookie, HTTPCookie, CookieSameSiteValue } from "./parsing/cookie-parsing";
export { HTTP_METHOD_REGEXP } from "./parsing/http-regex";
export {
	normalizeHTTPVersion,
	DEFAULT_HTTP_VERSION,
	HTTPVersionObject,
	HTTPVersionFormat
} from "./parsing/http-version-parsing";

// '/schema/'
export { HTTPHeaderField } from "./schema/http-headers";
export { HTTPMethod } from "./schema/http-method";
export { HTTPStatusCode } from "./schema/http-status-code";
export { MIMETypeUtilities, StringMIMEType, PreloadType, EXTENSION_MAP } from "./schema/mime-types";

// '/util/'
export { determineLineBreakStyle } from "./util/determine-line-break-style";
