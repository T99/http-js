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
export { HTTPError } from "./error/http-error";
export { HTTPRequestError } from "./error/http-request-error";
export { HTTPMalformedMessageError } from "./error/http-malformed-message-error";

// '/headers/'
export { HTTPHeadersManager, HTTPHeaders, ParseableHTTPHeaders } from "./headers/http-headers-manager";
export { MutableHTTPHeadersManager } from "./headers/mutable-http-headers-manager";
export {
	ImmutableHTTPHeadersManager,
	FieldTransformer
} from "./headers/immutable-http-headers-manager";
export { HTTPAcceptHeaderManager, AcceptHeaderValue } from "./headers/fields/http-accept-header-manager";

// '/messages/'

	// '/messages/message/'
	export { HTTPMessage, HTTPMessageConfig } from "./messages/message/http-message";
	export { MutableHTTPMessage } from "./messages/message/mutable-http-message";
	export { ImmutableHTTPMessage } from "./messages/message/immutable-http-message";
	export { IncomingHTTPMessage } from "./messages/message/incoming-http-message";
	export { OutgoingHTTPMessage } from "./messages/message/outgoing-http-message";
	
	// '/messages/request/'
	export { HTTPRequest, HTTPRequestConfig } from "./messages/request/http-request";
	export { MutableHTTPRequest } from "./messages/request/mutable-http-request";
	export { ImmutableHTTPRequest } from "./messages/request/immutable-http-request";
	export { AbstractIncomingHTTPRequest } from "./messages/request/abstract-incoming-http-request";
	export { AbstractOutgoingHTTPRequest } from "./messages/request/abstract-outgoing-http-request";

	// '/messages/response/'
	export { HTTPResponse, HTTPResponseConfig } from "./messages/response/http-response";
	export { MutableHTTPResponse } from "./messages/response/mutable-http-response";
	export { ImmutableHTTPResponse } from "./messages/response/immutable-http-response";
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
export {
	normalizeHTTPVersion,
	DEFAULT_HTTP_VERSION,
	HTTPVersionObject,
	HTTPVersionFormat
} from "./parsing/http-version-parsing";

// '/schema/'
export { HTTPStatusCode } from "./schema/http-status-code";
export { HTTPMethod } from "./schema/http-method";
export { HTTPHeaderField, CommonHTTPHeaderFields } from "./schema/http-headers";
export { MIMETypeUtilities, StringMIMEType, PreloadType, EXTENSION_MAP } from "./schema/mime-types";
export { HTTP_METHOD_REGEXP } from "./parsing/http-regex";

// '/util/'
export { determineLineBreakStyle } from "./util/determine-line-break-style";
