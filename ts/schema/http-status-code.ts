/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:05 PM -- March 17, 2022.
 * Project: @t99/http
 */

/**
 * An enumeration of valid HTTP status codes.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export class HTTPStatusCode {
	
	/**
	 * A registry of valid/official HTTP status codes that have been statically initialized on this class.
	 */
	protected static registry: Map<number, HTTPStatusCode> = new Map();
	
	/**
	 * The server has accepted that part of the data which has already been received from the client, and is instructing
	 * the client to continue sending the rest of the request (if more is available).
	 */
	public static readonly HTTP_CONTINUE: HTTPStatusCode = new HTTPStatusCode(
		100,
		"HTTP_CONTINUE",
		"The server has accepted that part of the data which has already been received from the client, " +
		"and is instructing the client to continue sending the rest of the request (if more is available)."
	);
	
	/**
	 * The server has agreed to switch communication protocols to that which has been requested by the client.
	 */
	public static readonly HTTP_SWITCHING_PROTOCOLS: HTTPStatusCode = new HTTPStatusCode(
		101,
		"HTTP_SWITCHING_PROTOCOLS",
		"The server has agreed to switch communication protocols to that which has been requested by the " +
		"client."
	);
	
	/**
	 * The server has received the full request and plans to respond to it, but is not ready to do so yet.
	 */
	public static readonly HTTP_PROCESSING: HTTPStatusCode = new HTTPStatusCode(
		102,
		"HTTP_PROCESSING",
		"The server has received the full request and plans to respond to it, but is not ready to do so yet."
	);
	
	/**
	 * The request succeeded in a manner expected by the server and client.
	 */
	public static readonly HTTP_OK: HTTPStatusCode = new HTTPStatusCode(
		200,
		"HTTP_OK",
		"The request succeeded in a manner expected by the server and client."
	);
	
	/**
	 * The request succeeded and has resulted in the creation of new resources on the server.
	 */
	public static readonly HTTP_CREATED: HTTPStatusCode = new HTTPStatusCode(
		201,
		"HTTP_CREATED",
		"The request succeeded and has resulted in the creation of new resources on the server."
	);
	
	/**
	 * The server has received the full request and may or may not eventually fulfill it.
	 */
	public static readonly HTTP_ACCEPTED: HTTPStatusCode = new HTTPStatusCode(
		202,
		"HTTP_ACCEPTED",
		"The server has received the full request and may or may not eventually fulfill it."
	);
	
	/**
	 * The request succeeded but the original response body has been modified by an intermediate proxy.
	 */
	public static readonly HTTP_NON_AUTHORITATIVE_INFORMATION: HTTPStatusCode = new HTTPStatusCode(
		203,
		"HTTP_NON_AUTHORITATIVE_INFORMATION",
		"The request succeeded but the original response body has been modified by an intermediate proxy."
	);
	
	/**
	 * The request succeeded but there is no content to convey back to the client.
	 */
	public static readonly HTTP_NO_CONTENT: HTTPStatusCode = new HTTPStatusCode(
		204,
		"HTTP_NO_CONTENT",
		"The request succeeded but there is no content to convey back to the client."
	);
	
	/**
	 * The request succeeded, and now the server is requesting that the client reset the document which precipitated
	 * this response.
	 */
	public static readonly HTTP_RESET_CONTENT: HTTPStatusCode = new HTTPStatusCode(
		205,
		"HTTP_RESET_CONTENT",
		"The request succeeded, and now the server is requesting that the client reset the document which " +
		"precipitated this response."
	);
	
	// TODO [7/27/2021 @ 10:07 AM] Missing 206, 207, 208, 226.
	
	/**
	 * The request has asked to access a resource for which multiple representations are available, so the server is
	 * enumerating the possible choices.
	 */
	public static readonly HTTP_MULTIPLE_CHOICES: HTTPStatusCode = new HTTPStatusCode(
		300,
		"HTTP_MULTIPLE_CHOICES",
		"The request has asked to access a resource for which multiple representations are available, so " +
		"the server is enumerating the possible choices."
	);
	
	/**
	 * The request has asked to access a resource that has been assigned a new permanent URI. The client MAY change the
	 * request method from POST to GET.
	 */
	public static readonly HTTP_MOVED_PERMANENTLY: HTTPStatusCode = new HTTPStatusCode(
		301,
		"HTTP_MOVED_PERMANENTLY",
		"The request has asked to access a resource that has been assigned a new permanent URI. The " +
		"client MAY change the request method from POST to GET."
	);
	
	/**
	 * The request has asked to access a resource that has been assigned a temporary URI. The client MAY change the
	 * request method from POST to GET.
	 */
	public static readonly HTTP_FOUND: HTTPStatusCode = new HTTPStatusCode(
		302,
		"HTTP_FOUND",
		"The request has asked to access a resource that has been assigned a temporary URI. The client " +
		"MAY change the request method from POST to GET."
	);
	
	/**
	 * The request has asked to access a resource that the server cannot directly provide, so an indirectly applicable
	 * resource has been indicated.
	 */
	public static readonly HTTP_SEE_OTHER: HTTPStatusCode = new HTTPStatusCode(
		303,
		"HTTP_SEE_OTHER",
		"The request has asked to access a resource that the server cannot directly provide, so an " +
		"indirectly applicable resource has been indicated."
	);
	
	/**
	 * The request has asked to conditionally access a resource, but the condition evaluated to false.
	 */
	public static readonly HTTP_NOT_MODIFIED: HTTPStatusCode = new HTTPStatusCode(
		304,
		"HTTP_NOT_MODIFIED",
		"The request has asked to conditionally access a resource, but the condition evaluated to false."
	);
	
	/**
	 * The request has asked to access a resource that has been assigned a temporary URI.
	 */
	public static readonly HTTP_TEMPORARY_REDIRECT: HTTPStatusCode = new HTTPStatusCode(
		307,
		"HTTP_TEMPORARY_REDIRECT",
		"The request has asked to access a resource that has been assigned a temporary URI."
	);
	
	/**
	 * The request has asked to access a resource that has been assigned a new permanent URI.
	 */
	public static readonly HTTP_PERMANENT_REDIRECT: HTTPStatusCode = new HTTPStatusCode(
		308,
		"HTTP_PERMANENT_REDIRECT",
		"The request has asked to access a resource that has been assigned a new permanent URI."
	);
	
	/**
	 * The server either cannot process, or refuses to process, the request of the client due to something that is
	 * perceived to be an error on behalf of the client.
	 */
	public static readonly HTTP_BAD_REQUEST: HTTPStatusCode = new HTTPStatusCode(
		400,
		"HTTP_BAD_REQUEST",
		"The server either cannot process, or refuses to process, the request of the client due to " +
		"something that is perceived to be an error on behalf of the client."
	);
	
	/**
	 * The client has not provided authentication information that is required to access the specified resource.
	 */
	public static readonly HTTP_UNAUTHORIZED: HTTPStatusCode = new HTTPStatusCode(
		401,
		"HTTP_UNAUTHORIZED",
		"The client has not provided authentication information that is required to access the specified " +
		"resource."
	);
	
	// TODO [7/27/2021 @ 10:08 AM] Missing 402.
	
	/**
	 * The client has provided authentication information, but their authentication information does not provide them
	 * with sufficient permissions to access the specified resource.
	 */
	public static readonly HTTP_FORBIDDEN: HTTPStatusCode = new HTTPStatusCode(
		403,
		"HTTP_FORBIDDEN",
		"The client has provided authentication information, but their authentication information does not" +
		" provide them with sufficient permissions to access the specified resource."
	);
	
	/**
	 * The server either could not find the specified resource or is unwilling to disclose its existence.
	 */
	public static readonly HTTP_NOT_FOUND: HTTPStatusCode = new HTTPStatusCode(
		404,
		"HTTP_NOT_FOUND",
		"The server either could not find the specified resource or is unwilling to disclose its existence."
	);
	
	/**
	 * The client attempted to use a known/valid HTTP method on a valid endpoint, but the specified method is not valid
	 * for the specified endpoint.
	 */
	public static readonly HTTP_METHOD_NOT_ALLOWED: HTTPStatusCode = new HTTPStatusCode(
		405,
		"HTTP_METHOD_NOT_ALLOWED",
		"The client attempted to use a known/valid HTTP method on a valid endpoint, but the specified " +
		"method is not valid for the specified endpoint."
	);
	
	// TODO [7/27/2021 @ 10:08 AM] Missing 406, 407, 408.
	
	/**
	 * The request could not be fulfilled due to an issue with the current state of the requested resource.
	 */
	public static readonly HTTP_CONFLICT: HTTPStatusCode = new HTTPStatusCode(
		409,
		"HTTP_CONFLICT",
		"The request could not be fulfilled due to an issue with the current state of the requested " +
		"resource."
	);
	
	// TODO [7/27/2021 @ 10:08 AM] Missing 410, 411, 412.
	
	/**
	 * The request attempted to retrieve a larger payload than the server is either willing, or able to transmit back to
	 * the client.
	 */
	public static readonly HTTP_PAYLOAD_TOO_LARGE: HTTPStatusCode = new HTTPStatusCode(
		413,
		"HTTP_PAYLOAD_TOO_LARGE",
		"The request attempted to retrieve a larger payload than the server is either willing, or able to " +
		"transmit back to the client."
	);
	
	// TODO [7/27/2021 @ 10:40 AM] Missing 414.
	
	/**
	 * The server cannot process the request because the payload is in a format not supported or allowed by the server.
	 */
	public static readonly HTTP_UNSUPPORTED_MEDIA_TYPE: HTTPStatusCode = new HTTPStatusCode(
		415,
		"HTTP_UNSUPPORTED_MEDIA_TYPE",
		"The server cannot process the request because the payload is in a format not supported or allowed" +
		" by the server."
	);
	
	// TODO [7/27/2021 @ 10:40 AM] Missing 416, 417.
	
	/**
	 * What do you want from me!? I'm a teapot.
	 */
	public static readonly HTTP_IM_A_TEAPOT: HTTPStatusCode = new HTTPStatusCode(
		418,
		"HTTP_IM_A_TEAPOT",
		"What do you want from me!? I'm a teapot."
	);
	
	// TODO [7/27/2021 @ 10:41 AM] Missing 421, 422, 423, 424, 426, 428, 429, 431, 444, 451, 499.
	
	/**
	 * The server encountered an internal issue not at the fault of the client that resulted in it being unable to
	 * fulfill the request.
	 */
	public static readonly HTTP_INTERNAL_SERVER_ERROR: HTTPStatusCode = new HTTPStatusCode(
		500,
		"HTTP_INTERNAL_SERVER_ERROR",
		"The server encountered an internal issue not at the fault of the client that resulted in it being" +
		" unable to fulfill the request."
	);
	
	// TODO [7/27/2021 @ 10:41 AM] Missing 501, 502, 503, 504, 505, 506, 507, 508, 510, 511, 599.
	
	/**
	 * The integer status code representative of this particular HTTP status code.
	 */
	protected readonly statusCode: number;
	
	/**
	 * The 'title' or short description of this particular HTTP status code.
	 *
	 * @type {string}
	 */
	protected readonly title: string;
	
	/**
	 * The 'explanation' or long description of this particular HTTP status code.
	 *
	 * @type {string}
	 */
	protected readonly explanation: string;
	
	/**
	 * Initializes a new HTTPStatusCode instance with the provided integer status code.
	 *
	 * @param {number} statusCode The integer status code representative of this particular HTTP status code.
	 * @param {string} title The 'title' or short description of this particular HTTP status code.
	 * @param {string} explanation The 'explanation' or long description of this particular HTTP status code.
	 */
	public constructor(statusCode: number, title: string, explanation: string) {
		
		this.statusCode = statusCode;
		this.title = title;
		this.explanation = explanation;
		
		HTTPStatusCode.registry.set(statusCode, this);
		
	}
	
	/**
	 * Returns true if the provided numeric status code has a matching HTTPStatusCode object registed to this class.
	 * 
	 * @param {number} statusCode A numeric status code for which to look for a matching HTTPStatusCode object
	 * registered to this class.
	 * @returns {boolean} true if the provided numeric status code has a matching HTTPStatusCode object registed to this
	 * class.
	 */
	public static hasStatusCode(statusCode: number): boolean {
		
		return HTTPStatusCode.registry.has(statusCode);
		
	}
	
	/**
	 * Returns the HTTPStatusCode object that matches the given numeric status code if such an object exists, otherwise
	 * throwing an error.
	 * 
	 * @param {number} statusCode A numeric status code for which to return a matching HTTPStatusCode object.
	 * @returns {HTTPStatusCode} The HTTPStatusCode object that matches the given numeric status code if such an object
	 * exists.
	 */
	public static fromStatusCode(statusCode: number): HTTPStatusCode {
		
		if (HTTPStatusCode.hasStatusCode(statusCode)) return HTTPStatusCode.registry.get(statusCode) as HTTPStatusCode;
		else throw new Error(`Failed to find an HTTPStatusCode with the provided numeric status code: ${statusCode}`);
		
	}
	
	/**
	 * Returns the integer status code representative of this particular HTTP status code.
	 *
	 * @return {number} The integer status code representative of this particular HTTP status code.
	 */
	public getStatusCode(): number {
		
		return this.statusCode;
		
	}
	
	/**
	 * Returns the 'title' or short description of this particular HTTP status code.
	 *
	 * @param {boolean} includeHTTP Whether or not to include the 'HTTP_' prefix in the title of the status code.
	 * Defaults to true.
	 * @return {string} The 'title' or short description of this particular HTTP status code.
	 */
	public getTitle(includeHTTP: boolean = true): string {
		
		if (includeHTTP) return this.title;
		else return this.title.substr(5);
		
	}
	
	/**
	 * Returns the 'explanation' or long description of this particular HTTP status code.
	 *
	 * @return {string} The 'explanation' or long description of this particular HTTP status code.
	 */
	public getExplanation(): string {
		
		return this.explanation;
		
	}
	
}
