import { ImmutableHTTPRequest } from "../messages/base/immutable-http-request";

export class HTTPRequestError extends Error {
	
	/**
	 * The HTTP request that originated this error.
	 */
	protected originatingRequest: ImmutableHTTPRequest;
	
	/**
	 * The Error that lead to the creation of this Error instance.
	 */
	protected parentError?: Error;
	
	/**
	 * Initializes a new RequestError instance for the specified originating request and optional message.
	 *
	 * @param {HTTPRequest} originatingRequest The HTTP request that generated this error.
	 * @param {string} message An optional message describing the error.
	 * @param {Error} parentError The Error that lead to the creation of this Error instance.
	 */
	public constructor(originatingRequest: ImmutableHTTPRequest, message?: string, parentError?: Error) {
		
		super(message);
		
		this.originatingRequest = originatingRequest;
		this.parentError = parentError;
		
	}
	
	/**
	 * Returns the HTTP request that originated this error.
	 * 
	 * @returns {HTTPRequest} The HTTP request that originated this error.
	 */
	public getOriginatingRequest(): ImmutableHTTPRequest {
		
		return this.originatingRequest;
		
	}
	
	/**
	 * Returns the Error that lead to the creation of this Error instance if such an Error exists, otherwise returning
	 * undefined.
	 * 
	 * @returns {Error} The Error that lead to the creation of this Error instance if such an Error exists, otherwise
	 * returning undefined.
	 */
	public getParentError(): Error | undefined {
		
		return this.parentError;
		
	}
	
}
