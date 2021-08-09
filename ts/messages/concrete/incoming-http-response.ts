import { HTTPHeaders } from "../../headers/immutable-http-headers-manager";
import { HTTPMethodable } from "../../schema/http-method";
import { OutgoingHTTPRequest } from "./outgoing-http-request";
import { ImmutableHTTPResponse } from "../base/immutable-http-response";
import { HTTPStatusCode } from "../../schema/http-status-code";

/**
 * Represents an HTTP response that was received in response to an enacted {@link OutgoingHTTPRequest} instance.
 * 
 * @see {@link ImmutableHTTPResponse} For a more generic HTTP response object.
 */
export class IncomingHTTPResponse extends ImmutableHTTPResponse {
	
	protected originRequest: OutgoingHTTPRequest;
	
	/**
	 * Initializes a new IncomingHTTPResponse instance with the provided originating request, HTTP method, URL, and
	 * optional collection of headers.
	 *
	 * @param {OutgoingHTTPRequest} originRequest
	 * @param {HTTPStatusCode} statusCode
	 * @param {HTTPMethodable} method
	 * @param {string | URL} url
	 * @param {HTTPHeaders} headers
	 */
	public constructor(originRequest: OutgoingHTTPRequest,
					   statusCode: HTTPStatusCode,
					   method: HTTPMethodable,
					   url: string | URL,
					   headers?: HTTPHeaders) {
		
		super(statusCode, method, url, headers);
		
		this.originRequest = originRequest;
		
	}
	
	/**
	 * 
	 * 
	 * @param {string} httpResponseMessage
	 * @returns {IncomingHTTPResponse}
	 * @see <a href="https://datatracker.ietf.org/doc/html/rfc2616">RFC 2616</a>
	 */
	public static createFromRawHTTPResponseMessage(httpResponseMessage: string): IncomingHTTPResponse {
		
		// let lineBreakCharacters: string = determineLineBreakStyle(httpResponseMessage);
		
		// let headersSectionLines: string[] =
		// 	httpResponseMessage.split(lineBreakCharacters + lineBreakCharacters, 1)[0].split(lineBreakCharacters);
		
		// TODO [8/9/2021 @ 1:29 PM] Rip off the bandaid!
		return undefined as any;
		
	}
	
	public getMatchingRequest(): OutgoingHTTPRequest {
		
		return this.originRequest;
		
	}
	
}
