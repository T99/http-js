import { HTTPHeaders } from "../../headers/immutable-http-headers-manager";
import { ImmutableHTTPMessage } from "../abstract/immutable-http-message";
import { HTTPMethodable } from "../../schema/http-method";
import { HTTPResponse } from "../interfaces/http-response";
import { OutgoingHTTPRequest } from "./outgoing-http-request";
import { HTTPStatusCode } from "../../schema/http-status-code";

export class IncomingHTTPResponse extends ImmutableHTTPMessage implements HTTPResponse {
	
	protected originRequest: OutgoingHTTPRequest;
	
	/**
	 * Initializes a new IncomingHTTPResponse instance with the provided originating request, HTTP method, URL, and
	 * optional collection of headers.
	 * 
	 * @param {OutgoingHTTPRequest} originRequest
	 * @param {HTTPMethodable} method
	 * @param {string | URL} url
	 * @param {HTTPHeaders} headers
	 */
	public constructor(originRequest: OutgoingHTTPRequest, method: HTTPMethodable, url: string | URL,
					   headers?: HTTPHeaders) {
		
		super(method, url, headers);
		
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
	
	public getStatusCode(): HTTPStatusCode {
		
		return undefined as any;
		
	}
	
}
