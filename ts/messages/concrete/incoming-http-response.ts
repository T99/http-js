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
		
		/**
		 * Returns a best-guess approximation of the line break character sequence being used by the provided string.
		 * 
		 * @param {string} input The string for which to attempt to determine a line-break style.
		 * @returns {string} The character sequence that this function believes serves as the line-break style for the
		 * provided input string.
		 */
		function determineLineBreakStyle(input: string): string {
			
			let indexOfLineFeed: number = input.indexOf("\n");
			
			// Line-feed character not found...
			if (indexOfLineFeed === -1) {
				
				// If we can find a carriage-return character, that must be the intended line-break style.
				if (input.indexOf("\r") !== -1) return "\r";
				
				// No line break characters found... default to "\r\n" because that is the line-break in the spec.
				else return "\r\n";
				
			// Found a line-feed character...
			} else {
				
				// We found a "\r\n" character sequence, that must be the intended line-break style.
				if (input.charAt(indexOfLineFeed - 1) === "\r") return "\r\n";
				
				// The line-feed character we found was not preceded by a carriage-return, so the intended line-break
				// style must just be a plain line-feed character.
				else return "\n";
				
			}
			
		}
		
		let lineBreakCharacters: string = determineLineBreakStyle(httpResponseMessage);
		
		let headersSectionLines: string[] =
			httpResponseMessage.split(lineBreakCharacters + lineBreakCharacters, 1)[0].split(lineBreakCharacters);
		
	}
	
	public getMatchingRequest(): OutgoingHTTPRequest {
		
		return this.originRequest;
		
	}
	
	public getStatusCode(): HTTPStatusCode {
		
		return undefined as any;
		
	}
	
}
