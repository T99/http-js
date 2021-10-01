import { HTTPMessage, HTTPMessageConfig } from "../message/http-message";
import { ImmutableHTTPRequest } from "./immutable-http-request";
import { MutableHTTPRequest } from "./mutable-http-request";
import { HTTPResponse } from "../response/http-response";

export type HTTPRequestConfig = HTTPMessageConfig & {};

export class HTTPRequest extends HTTPMessage implements ImmutableHTTPRequest, MutableHTTPRequest {
	
	protected response?: HTTPResponse;
	
	public constructor(config: HTTPRequestConfig) {
		
		super(config);
		
	}
	
	public hasMatchingResponse(): boolean {
		
		return this.response !== undefined;
		
	}
	
	public getMatchingResponse(): HTTPResponse | undefined {
		
		return this.response;
		
	}
	
	public setMatchingResponse(response: HTTPResponse): void {
		
		this.response = response;
		
	}
	
}
